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

let evaluationCounter = 100;

function formatLocalTimestamp(d: Date): string {
  // Matches the existing seed data style like "2:14 PM"
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function createEvaluationId(): string {
  // Simple, readable sequential IDs for this client session.
  evaluationCounter += 1;
  return `rlhf_${evaluationCounter}`;
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

