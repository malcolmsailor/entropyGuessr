import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Collapse } from "@mui/material";
import { useContext, useState } from "react";
import { GameContext } from "../../../context/GameContext";

export const ConstraintToggles = () => {
  const { constraints, setConstraints } = useContext(GameContext);
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={
          <Typography
            variant="subtitle1"
            fontWeight={cardOpen ? "bold" : "normal"}
          >
            Constraints
          </Typography>
        }
        action={
          <IconButton onClick={() => setCardOpen(!cardOpen)}>
            {cardOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        }
        sx={{ paddingTop: 0 }}
      />
      <Collapse in={cardOpen}>
        <CardContent
          sx={{
            paddingTop: 0,
            "&:last-child": {
              paddingBottom: 0.5,
            },
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={constraints.sumToOne}
                  onChange={(event) =>
                    setConstraints({
                      ...constraints,
                      sumToOne: event.target.checked,
                    })
                  }
                  sx={{ padding: 0.5 }}
                />
              }
              label="Distribution must sum to 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={constraints.allNonZero}
                  onChange={(event) =>
                    setConstraints({
                      ...constraints,
                      allNonZero: event.target.checked,
                    })
                  }
                  sx={{ padding: 0.5 }}
                />
              }
              label="All values must be nonzero"
            />
          </FormGroup>
        </CardContent>
      </Collapse>
    </Card>
  );
};
