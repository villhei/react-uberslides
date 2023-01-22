export type ReactSlidesAnimation = {
  keyframes: Keyframe[];
  initialStyles?: React.CSSProperties;
};

const fadeIn: ReactSlidesAnimation = {
  initialStyles: { opacity: 0 },
  keyframes: [
    { opacity: 0, offset: 0 },
    { opacity: 0, offset: 0.2 },
    { opacity: 1, offset: 0.8 },
    { opacity: 1, offset: 1.0 },
  ],
};

const fadeOut: ReactSlidesAnimation = {
  initialStyles: { opacity: 1 },
  keyframes: [
    { opacity: 1, offset: 0.0 },
    { opacity: 1, offset: 0.2 },
    { opacity: 0, offset: 0.8 },
    { opacity: 0, offset: 1.0 },
  ],
};

const fallIn: ReactSlidesAnimation = {
  initialStyles: { opacity: 0, transform: "scale(10)" },
  keyframes: [
    {
      transform: "scale(10)",
      opacity: 0,
    },
    {
      opacity: 1,
      offset: 0.8,
    },
    { transform: "scale(1)", opacity: 1, offset: 1.0 },
  ],
};

const flipColors: ReactSlidesAnimation = {
  initialStyles: { color: "black" },
  keyframes: [
    {
      offset: 0,
      color: "black",
    },
    { color: "white", offset: 1 },
  ],
};

export const animations: Record<string, ReactSlidesAnimation> = {
  fadeIn,
  fadeOut,
  fallIn,
  flipColors,
} as const;
