export const animations = {
  fadeIn: [
    { opacity: 0, offset: 0 },
    { opacity: 0, offset: 0.2 },
    { opacity: 1, offset: 0.8 },
    { opacity: 1, offset: 1.0 },
  ] as Keyframe[],
  fadeOut: [
    { opacity: 1, offset: 0.0 },
    { opacity: 1, offset: 0.2 },
    { opacity: 0, offset: 0.8 },
    { opacity: 0, offset: 1.0 },
  ] as Keyframe[],
  fallIn: [
    {
      transform: "scale(10)",
      opacity: 0,
    },
    {
      opacity: 1,
      offset: 0.8,
    },
    { transform: "scale(1)", opacity: 1, offset: 1.0 },
  ] as Keyframe[],
} as const;
