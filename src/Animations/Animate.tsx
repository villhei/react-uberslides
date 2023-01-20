import React from "react";
import { animations, animationConfigs, timings } from "../constants";
import { useAnimation } from "../utils";
import { AnimateProps } from "./AnimateTypes";

export const Animate = (props: AnimateProps) => {
  const {
    animation = animations.fadeIn,
    animationConfig: animationConfigProp = animationConfigs.animateOnce,
    delay = timings.default,
  } = props;

  const options = {
    ...animationConfigProp,
    delay,
  };
  const children = React.Children.map(props.children, (child) => {
    const { ref } = useAnimation(animation, options);

    if (typeof child === "string") {
      return (
        <div style={{ display: "inline-block" }} ref={ref as any}>
          {child}
        </div>
      );
    }
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        ref,
      });
    } else {
      return child;
    }
  });
  return <>{children}</>;
};
