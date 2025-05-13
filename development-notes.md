# Installation

I initialized the project with

```bash
npm create vite@latest
cd entropy-mui
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install recharts
```

# Component spec

Example from Claude:

```
MathGuessingGame
|-- Settings
|   |-- DifficultySelector
|   |-- NumberRangeInput
|   |-- OperationTypeSelector
|-- GuessForm
|   |-- AnswerInput
|   |-- ConstraintToggles
|   |   |-- IntegerOnlyToggle
|   |   |-- FractionFormatToggle
|   |   |-- DecimalPlacesSelector
|   |-- SubmitButton
|-- ResultsDisplay
    |-- CurrentGuessResult
    |   |-- CorrectAnswerDisplay
    |   |-- FeedbackMessage
    |-- GuessHistory
        |-- GuessItem
```

```
EntropyGuessingGame
|-- Shared
|   |-- DistributionBarPlot
|-- TargetDisplayArea
|   |-- Settings
|   |   |-- NumberOfOutcomesInput
|   |   |-- MetricSelector
|   |-- TargetDisplay
|   |-- NewTargetButton
|-- GuessForm
|   |-- AnswerCard
|   |   |-- AnswerInput
|   |   |-- AnswerBarChart
|   |-- ConstraintToggles
|   |   |-- SumToOneToggle // No separate file
|   |   |-- NonZeroToggle  // No separate file
|   |-- SubmitButton
|-- GuessDisplay
    |-- ValueLines
    |-- GuessCardsContainer
        |-- GuessCard (multiple instances)
            |-- GuessPoint
            |-- DistanceLine
            |-- GuessCardContent
```

GuessesCard should have:
- three labeled horizontal lines for each of min, max, and target
- cards for each 

`logic/` folder structure

```
logic/
  TODO
```


