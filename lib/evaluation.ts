export type EvaluationChoice = "orion" | "nova" | "equal";

export type LogEntry = {
  /**
   * Unique row ID for React rendering.
   * Not necessarily the same as `evaluationId`.
   */
  id: string;
  /** Local, human-readable timestamp (UI display). */
  timestamp: string;
  /** Unique evaluation identifier (workflow-facing). */
  evaluationId: string;
  choice: EvaluationChoice;
};

function formatLocalTimestamp(d: Date): string {
  // Matches the existing seed data style like "2:14 PM"
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function createEvaluationId(): string {
  return `rlhf_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function createEvaluationEntry(choice: EvaluationChoice): LogEntry {
  const now = new Date();
  const id = createEvaluationId();
  return {
    // Use a single, consistent ID for this evaluation entry.
    id,
    timestamp: formatLocalTimestamp(now),
    evaluationId: id,
    choice,
  };
}

