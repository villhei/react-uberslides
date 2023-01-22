import React from "react";
import { AnimationEventMap } from "../utils";
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
  const { animationConfig = {}, delay: delayProp, initialDelay = 0 } = props;

  const { duration } = animationConfig;

  const stepDelay = getStepDelay(delayProp, duration);

  const childrenProp = props.children;
  if (Array.isArray(childrenProp)) {
    const children = React.Children.map(childrenProp, (child, i) => {
      const delay = initialDelay + i * stepDelay;
      const events = getEventConfig(i, childrenProp.length);

      return (
        <Animate {...props} delay={delay} events={events}>
          {child}
        </Animate>
      );
    });
    return <>{children}</>;
  }
  return <Animate {...props} />;
};

const getEventConfig = (i: number, total: number): AnimationEventMap => {
  return {
    started: i === 0,
    canceled: true,
    finished: i === total - 1,
  };
};
