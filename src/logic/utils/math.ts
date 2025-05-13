import gamma from "@stdlib/random-base-gamma";

export function entropyToPerplexity(entropy: number) {
  return Math.pow(2, entropy);
}

export function perplexityToEntropy(perplexity: number) {
  return Math.log2(perplexity);
}

export function calculateDistributionEntropy(probabilities: number[]) {
  // Normalize the probabilities
  const sum = probabilities.reduce((a, b) => a + b, 0);
  const normalizedProbabilities = probabilities.map((p) => p / sum);

  return normalizedProbabilities.reduce((entropy, p) => {
    if (p === 0) return entropy;
    return entropy - p * Math.log2(p);
  }, 0);
}

export function sampleDirichlet(alpha: number | number[], n: number) {
  // If alpha is a number, create an array of n alphas
  if (typeof alpha === "number") {
    alpha = Array(n).fill(alpha);
  }

  // Sample from n independent gamma distributions
  const samples = alpha.map((a) => gamma(a, 1));

  // Normalize to sum to 1
  const sum = samples.reduce((a, b) => a + b, 0);
  return samples.map((x) => x / sum);
}
