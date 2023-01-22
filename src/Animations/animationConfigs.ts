import { timings } from "../constants/timings";

export const animationConfigs = {
  animateOnce: {
    iterations: 1,
    easing: "ease-in-out",
    duration: timings.default,
    fill: "forwards",
  } as KeyframeAnimationOptions,
  animateOnceLinear: {
    iterations: 1,
    easing: "linear",
    duration: timings.default,
    fill: "forwards",
  } as KeyframeAnimationOptions,
  animateOnceSlowly: {
    iterations: 1,
    easing: "ease-in-out",
    duration: timings.slowest,
    fill: "forwards",
  } as KeyframeAnimationOptions,
};
