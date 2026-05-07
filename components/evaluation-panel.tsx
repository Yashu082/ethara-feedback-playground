import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResponseCard from "./response-card";
import { useRef, useState } from "react";
import type { EvaluationChoice } from "@/lib/evaluation";

interface EvaluationPanelProps {
  prompt: string;
  responses: {
    orion: string;
    nova: string;
  };
  onEvaluate: (choice: EvaluationChoice) => Promise<void> | void;
}

export default function EvaluationPanel({
  prompt,
  responses,
  onEvaluate,
}: EvaluationPanelProps) {
  const [selectedChoice, setSelectedChoice] = useState<"orion" | "nova" | null>(null);
  const [activeChoice, setActiveChoice] = useState<EvaluationChoice | null>(null);
  const activeTimeoutRef = useRef<number | null>(null);

  const handleChoice = (choice: EvaluationChoice) => {
    if (activeTimeoutRef.current) {
      window.clearTimeout(activeTimeoutRef.current);
    }
    setActiveChoice(choice);
    activeTimeoutRef.current = window.setTimeout(() => {
      setActiveChoice(null);
      activeTimeoutRef.current = null;
    }, 900);

    setSelectedChoice(choice === "equal" ? null : choice);
    onEvaluate(choice);
  };

  return (
    <div className="w-full space-y-10">
      {/* Domain Context */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
        <p className="text-sm font-medium tracking-wide text-zinc-400">
          Evaluation Domain: Creative Writing Alignment
        </p>
      </div>

      {/* Prompt Section */}
      <Card className="border-zinc-800 bg-zinc-900 p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Evaluation Prompt
          </p>
          <p className="text-base leading-relaxed text-zinc-100">{prompt}</p>
        </div>
      </Card>

      {/* Response Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <ResponseCard
          modelName="Variant Orion"
          response={responses.orion}
          isSelected={selectedChoice === "orion"}
        />
        <ResponseCard
          modelName="Variant Nova"
          response={responses.nova}
          isSelected={selectedChoice === "nova"}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Button
          onClick={() => handleChoice("orion")}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
            selectedChoice === "orion"
              ? "border border-blue-600 bg-blue-600/15 text-blue-300 shadow-lg shadow-blue-600/20 hover:bg-blue-600/25 hover:shadow-blue-600/30"
              : "border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/70 hover:text-zinc-100"
          } ${activeChoice === "orion" ? "ring-2 ring-blue-500/60 scale-[1.02]" : ""}`}
        >
          Variant Orion Better
        </Button>
        <Button
          onClick={() => handleChoice("nova")}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
            selectedChoice === "nova"
              ? "border border-purple-600 bg-purple-600/15 text-purple-300 shadow-lg shadow-purple-600/20 hover:bg-purple-600/25 hover:shadow-purple-600/30"
              : "border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/70 hover:text-zinc-100"
          } ${activeChoice === "nova" ? "ring-2 ring-purple-500/60 scale-[1.02]" : ""}`}
        >
          Variant Nova Better
        </Button>
        <Button
          onClick={() => handleChoice("equal")}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeChoice === "equal"
              ? "border border-slate-600 bg-slate-800/60 text-slate-100 shadow-lg shadow-slate-900/30"
              : "border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/70 hover:text-zinc-100"
          } ${activeChoice === "equal" ? "ring-2 ring-slate-400/40 scale-[1.02]" : ""}`}
        >
          Comparable Outputs
        </Button>
      </div>
    </div>
  );
}
