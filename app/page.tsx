"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import EvaluationPanel from "@/components/evaluation-panel";
import AuditLog from "@/components/audit-log";
import { createEvaluationEntry, type EvaluationChoice, type LogEntry } from "@/lib/evaluation";
import { supabase } from "@/lib/supabase";

type EvaluationRow = {
  id: string;
  timestamp: string;
  evaluation_id: string;
  choice: string;
};

const isEvaluationChoice = (value: string): value is EvaluationChoice =>
  value === "orion" || value === "nova" || value === "equal";

const getEvaluationSequence = (evaluationId: string): number => {
  const match = /^rlhf_(\d+)$/.exec(evaluationId);
  return match ? Number.parseInt(match[1], 10) : -1;
};

export default function Home() {
  const [auditLog, setAuditLog] = useState<LogEntry[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvaluationHistory = async (): Promise<void> => {
      setIsLoadingHistory(true);
      setHistoryError(null);

      try {
        const { data, error } = await supabase
          .from("evaluations")
          .select("id, timestamp, evaluation_id, choice");

        if (error) {
          setHistoryError("Could not load evaluation history.");
          console.error("Failed to load evaluation history:", error.message);
          return;
        }

        const rows: EvaluationRow[] = Array.isArray(data) ? (data as EvaluationRow[]) : [];
        const normalizedEntries: LogEntry[] = rows
          .filter((row) => isEvaluationChoice(row.choice))
          .map((row) => ({
            id: row.id,
            timestamp: row.timestamp,
            evaluationId: row.evaluation_id,
            choice: row.choice,
          }))
          .sort(
            (a, b) => getEvaluationSequence(b.evaluationId) - getEvaluationSequence(a.evaluationId)
          );

        setAuditLog((prev) => {
          if (prev.length === 0) {
            return normalizedEntries;
          }

          const seen = new Set(normalizedEntries.map((entry) => entry.id));
          const optimisticOnly = prev.filter((entry) => !seen.has(entry.id));
          return [...optimisticOnly, ...normalizedEntries];
        });
      } catch (error) {
        setHistoryError("Could not load evaluation history.");
        console.error("Unexpected error while loading evaluation history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    void loadEvaluationHistory();
  }, []);

  const handleEvaluate = async (choice: EvaluationChoice): Promise<void> => {
    const newEntry = createEvaluationEntry(choice);
    setAuditLog((prev) => [newEntry, ...prev]);

    try {
      const { error } = await supabase.from("evaluations").insert({
        id: newEntry.id,
        timestamp: newEntry.timestamp,
        evaluation_id: newEntry.evaluationId,
        choice: newEntry.choice,
      });

      if (error) {
        console.error("Failed to persist evaluation:", error.message);
      }
    } catch (error) {
      console.error("Unexpected error while persisting evaluation:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Navbar />
      
      <main className="flex-1 space-y-12 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl space-y-12">
          {/* Evaluation Panel */}
          <EvaluationPanel
            prompt="Generate a creative story opening that hooks the reader with vivid sensory details and emotional intrigue."
            responses={{
              orion:
                "The old lighthouse keeper's hands trembled as he gripped the brass telescope, not from age, but from what he'd seen beyond the horizon—something that made the stars themselves seem like distant echoes of a forgotten promise.",
              nova:
                "Sarah walked into the coffee shop and noticed it was busy. She ordered her usual drink and sat down at a table by the window. Outside, people were walking by on the street.",
            }}
            onEvaluate={handleEvaluate}
          />

          {/* Audit Log */}
          {isLoadingHistory && (
            <p className="text-sm text-zinc-500">Loading evaluation history...</p>
          )}
          {historyError && <p className="text-sm text-red-400">{historyError}</p>}
          <AuditLog entries={auditLog} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl px-6 py-4">
          <p className="text-center text-xs text-zinc-500 tracking-wide">
            Human-in-the-loop evaluation workspace
          </p>
        </div>
      </footer>
    </div>
  );
}
