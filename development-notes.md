# Installation

I initialized the project with

```bash
npm create vite@latest
cd entropy-guessr
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install recharts
```

# Component spec

```
EntropyGuessingGame
|-- Shared
|   |-- DistributionBarPlot
|-- Header
|-- Settings
|   |-- NumberOfOutcomesInput
|   |-- MetricSelector
|   |-- ConstraintToggles
|   |   |-- SumToOneToggle // No separate file
|   |   |-- NonZeroToggle  // No separate file
|-- AnswerCard
|   |-- AnswerInput
|   |-- CalculateButton
|   |-- AnswerBarChart
|-- GuessDisplay
|   |-- ResultsCard
|   |   |-- NewTargetButton
|   |-- GuessChart
|   |   |-- GuessTooltip
|   |   |-- TooltipBarChart

```

