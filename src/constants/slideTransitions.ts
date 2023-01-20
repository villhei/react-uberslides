export const slideTransitions = {
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
  slideLeft: [
    { transform: "translate(0%, 0)", offset: 0.0 },
    { transform: "translate(-100%, 0)", offset: 1.0 },
  ] as Keyframe[],
  slideRight: [
    { transform: "translate(0%, 0)", offset: 0.0 },
    { transform: "translate(100%, 0)", offset: 1.0 },
  ] as Keyframe[],
  slideFromRight: [
    { transform: "translate(100%, 0)", offset: 0.0 },
    { transform: "translate(0%, 0)", offset: 1.0 },
  ] as Keyframe[],
  slideFromLeft: [
    { transform: "translate(-100%, 0)", offset: 0.0 },
    { transform: "translate(0%, 0)", offset: 1.0 },
  ] as Keyframe[],
} as const;
