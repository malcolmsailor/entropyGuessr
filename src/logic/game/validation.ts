import type {
  SettingsState,
  ConstraintsState,
} from "../../context/GameContext";

function isValidFloat(str: string) {
  const trimmed = str.trim();
  const parsed = parseFloat(trimmed);
  return !isNaN(parsed) && parsed.toString().length === trimmed.length;
}

function validateNumberOfProbabilities(probabilities: any[], n: number) {
  return probabilities.length == n;
}

function validatePositiveSum(probabilities: number[]) {
  return probabilities.reduce((a, b) => a + b, 0) > 0;
}

function validateNonNegativeProbabilities(probabilities: number[]) {
  return probabilities.every((p) => p >= 0);
}

function validateSumToOne(probabilities: number[]) {
  return Math.abs(probabilities.reduce((a, b) => a + b, 0) - 1) < 0.0001;
}

function validateAllNonZero(probabilities: number[]) {
  return probabilities.every((p) => p !== 0);
}

export function validateAnswer(
  answer: string,
  settings: SettingsState,
  constraints: ConstraintsState
): [boolean, string[]] {
  if (answer.trim() === "") {
    return [false, ["Error: Answer cannot be empty"]];
  }
  const error_messages: string[] = [];
  const values = answer.trim().split(/\s+/);
  const num_outcomes = settings.numOutcomes;

  if (!validateNumberOfProbabilities(values, num_outcomes)) {
    error_messages.push(`Error: There must be ${num_outcomes} values`);
  }

  try {
    for (const value of values) {
      if (!isValidFloat(value)) {
        error_messages.push("Error: All values must be numbers");
        return [false, error_messages];
      }
    }
  } catch {
    error_messages.push("Error: All values must be numbers");
    return [false, error_messages];
  }

  const probabilities = values.map((value) => parseFloat(value));

  if (!validatePositiveSum(probabilities)) {
    error_messages.push("Error: Sum of probabilities must be positive");
  }

  if (!validateNonNegativeProbabilities(probabilities)) {
    error_messages.push("Error: All probabilities must be non-negative");
  }

  if (constraints.sumToOne && !validateSumToOne(probabilities)) {
    error_messages.push("Error: Sum of probabilities must be 1");
  }

  if (constraints.allNonZero && !validateAllNonZero(probabilities)) {
    error_messages.push("Error: All probabilities must be non-zero");
  }

  return [error_messages.length === 0, error_messages];
}
