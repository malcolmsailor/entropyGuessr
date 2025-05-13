import { calculateDistributionEntropy, sampleDirichlet } from "../utils/math";

export function generateNewTarget(numOutcomes: number) {
  // Sample a distribution from Dirichlet(1,1,...,1) and calculate its entropy
  const targetDistribution = sampleDirichlet(1, numOutcomes);
  return calculateDistributionEntropy(targetDistribution);
}
