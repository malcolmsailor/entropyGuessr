import { createContext, useState } from "react";
import { generateNewTarget } from "../logic/game/generateNewTarget";

type TargetMetric = "entropy" | "perplexity";

export interface SettingsState {
  numOutcomesRaw: string;
  numOutcomes: number;
  metric: TargetMetric;
  maxEntropy: number;
  activeTooltipIndex?: number | undefined;
}

export interface ConstraintsState {
  sumToOne: boolean;
  allNonZero: boolean;
}

interface GuessState {
  metric: number;
  distribution: number[];
}

interface GuessesState {
  [id: string]: GuessState;
}

interface GameContextType {
  settings: SettingsState;
  setSettings: (settings: SettingsState) => void;
  constraints: ConstraintsState;
  setConstraints: (constraints: ConstraintsState) => void;
  answer: string;
  setAnswer: (answer: string) => void;
  target: number;
  setTarget: (target: number) => void;
  guesses: GuessesState;
  setGuesses: (guesses: GuessesState) => void;
  validationErrors: string[] | undefined;
  setValidationErrors: (validationErrors: string[] | undefined) => void;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>({
    numOutcomesRaw: "3",
    numOutcomes: 3,
    metric: "entropy",
    maxEntropy: Math.log2(3),
  });

  const initialTarget = generateNewTarget(settings.numOutcomes);

  const [target, setTarget] = useState<number>(initialTarget);

  const [constraints, setConstraints] = useState<ConstraintsState>({
    sumToOne: false,
    allNonZero: false,
  });

  const [answer, setAnswer] = useState<string>("");

  const [guesses, setGuesses] = useState<GuessesState>({});

  const [validationErrors, setValidationErrors] = useState<
    string[] | undefined
  >(undefined);

  // TODO: (Malcolm 2025-05-05) add guess history. I'm not sure if both
  // guess history and answer are necessary.

  return (
    <GameContext.Provider
      value={{
        settings,
        setSettings,
        constraints,
        setConstraints,
        answer,
        setAnswer,
        target,
        setTarget,
        guesses,
        setGuesses,
        validationErrors,
        setValidationErrors,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
export type { TargetMetric, GuessesState, GuessState };
