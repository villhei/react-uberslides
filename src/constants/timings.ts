const DEFAULT_TIMING = 300;

export const timings = {
  slowest: DEFAULT_TIMING * 3,
  slower: DEFAULT_TIMING * 2,
  slow: DEFAULT_TIMING * 1.5,
  default: DEFAULT_TIMING,
  fast: DEFAULT_TIMING / 1.5,
  faster: DEFAULT_TIMING / 2,
  fastest: DEFAULT_TIMING / 3,
};
