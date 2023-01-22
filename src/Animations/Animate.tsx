import React, { CSSProperties, ReactElement } from "react";
import { useAnimationEventsChannel } from "../AnimationEvents";
import { useAnimation, UseAnimationOptions, AnimationEventMap } from "../utils";
import { AnimateProps } from "./AnimateTypes";
import { animationConfigs } from "./animationConfigs";
import { animations } from "./animations";

const allEvents: AnimationEventMap = {
  started: true,
  canceled: true,
  finished: true,
};

export const Animate = (props: AnimateProps) => {
  const {
    animation = animations.fadeIn,
    animationConfig: animationConfigProp = animationConfigs.animateOnce,
    delay = 0,
    disabled = false,
    startOn,
    name,
    events = allEvents,
  } = props;

  const animationConfig = {
    ...animationConfigProp,
    delay,
  };

  const { animationsEnabled } = useAnimationEventsChannel();

  const children = React.Children.map(props.children, (child) => {
    const options: UseAnimationOptions = {
      name,
      disabled,
      startOn,
      events,
    };
    const { ref } = useAnimation(animation.keyframes, animationConfig, options);

    if (typeof child === "string") {
      if (!animationsEnabled || disabled) {
        return { child };
      }
      return (
        <div style={{ display: "inline-block" }} ref={ref as any}>
          {child}
        </div>
      );
    }
    if (React.isValidElement<{ style: CSSProperties }>(child)) {
      const style = {
        ...child.props.style,
        ...(animationsEnabled && !disabled
          ? animation.initialStyles
          : undefined),
      };
      return React.cloneElement(child as ReactElement, {
        ref,
        style,
      });
    } else {
      return child;
    }
  });
  return <>{children}</>;
};
