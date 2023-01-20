import React from "react";
import { timings } from "../constants";
import { Animate } from "./Animate";
import { AnimateProps } from "./AnimateTypes";

function getStepDelay(
  delay: number | undefined,
  duration: string | number | undefined
): number {
  if (typeof delay === "number") {
    return delay;
  }
  if (typeof duration === "number") {
    return duration;
  } else {
    return timings.default;
  }
}
export const AnimateSequence = (
  props: AnimateProps & { initialDelay?: number }
) => {
  const {
    animationConfig = {},
    delay: delayProp,
    initialDelay = timings.default,
  } = props;

  const { duration } = animationConfig;

  const stepDelay = getStepDelay(delayProp, duration);
  if (Array.isArray(props.children)) {
    const children = React.Children.map(props.children, (child, i) => {
      const delay = initialDelay + i * stepDelay;
      return (
        <Animate {...props} delay={delay}>
          {child}
        </Animate>
      );
    });
    return <>{children}</>;
  }
  return <Animate {...props} />;
};
