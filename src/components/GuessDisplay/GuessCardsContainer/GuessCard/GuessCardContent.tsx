import { DistributionBarPlot } from "../../../shared/DistributionBarPlot";

interface GuessCardContentProps {
  distribution: number[];
}

export const GuessCardContent = ({ distribution }: GuessCardContentProps) => {
  // TODO: (Malcolm 2025-05-06) set the width and height of the bar plot dynamically
  return (
    <DistributionBarPlot distribution={distribution} width={100} height={100} />
  );
};
