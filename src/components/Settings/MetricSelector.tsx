import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import type { TargetMetric } from "../../context/GameContext";

export const MetricSelector = () => {
  const { settings, setSettings } = useContext(GameContext);
  return (
    <FormControl>
      <FormLabel>Target Metric</FormLabel>
      <RadioGroup
        row
        value={settings.metric}
        onChange={(event) =>
          setSettings({
            ...settings,
            metric: event.target.value as TargetMetric,
          })
        }
      >
        <FormControlLabel value="entropy" control={<Radio />} label="Entropy" />
        <FormControlLabel
          value="perplexity"
          control={<Radio />}
          label="Perplexity"
        />
      </RadioGroup>
    </FormControl>
  );
};
