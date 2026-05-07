"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import EvaluationPanel from "@/components/evaluation-panel";
import AuditLog from "@/components/audit-log";
import { createEvaluationEntry, type EvaluationChoice, type LogEntry } from "@/lib/evaluation";

export default function Home() {
  const [auditLog, setAuditLog] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2:14 PM",
      evaluationId: "eval_001",
      choice: "orion",
    },
    {
      id: "2",
      timestamp: "2:12 PM",
      evaluationId: "eval_002",
      choice: "equal",
    },
    {
      id: "3",
      timestamp: "2:10 PM",
      evaluationId: "eval_003",
      choice: "nova",
    },
  ]);

  const handleEvaluate = (choice: EvaluationChoice) => {
    const newEntry = createEvaluationEntry(choice);
    setAuditLog((prev) => [newEntry, ...prev]);
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
