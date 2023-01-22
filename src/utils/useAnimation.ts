import { useEffect } from "react";
import {
  AnimationEvent,
  AnimationMessage,
  AnimationMessageHandler,
  useAnimationEventsChannel,
} from "../AnimationEvents";
import useIntersectionObserver from "./useIntersectionObserver";

export type AnimationEventMap = { [event in AnimationEvent]: boolean };

export type UseAnimationOptions = {
  name?: string;
  disabled?: boolean;
  startOn?: AnimationMessage;
  events: AnimationEventMap;
};

const defaultOptions = {
  startOn: {
    name: "slide-enter",
    event: "finished",
  },
};
export const useAnimation = <T extends HTMLElement>(
  keyframes: Array<Keyframe>,
  config: KeyframeAnimationOptions,
  options: UseAnimationOptions
) => {
  const { ref, hasIntersected } = useIntersectionObserver<T>();

  const channel = useAnimationEventsChannel();
  useEffect(() => {
    const node = ref.current;

    const { name, disabled, events } = options;
    const startOn = options.startOn ?? defaultOptions.startOn;

    if (!node || !hasIntersected || disabled || !channel.animationsEnabled) {
      return;
    }

    const animation = node.animate(keyframes, config);
    animation.pause();

    const listener: AnimationMessageHandler = (event) => {
      if (event.name === startOn.name && event.event === startOn.event) {
        animation.play();
        if (name && events.started) {
          channel.sendAnimationEvent(name, "started");
        }
      }
    };

    channel.subscribe(listener);

    const cancelListener = () => {
      if (name) channel.sendAnimationEvent(name, "canceled");
    };

    const finishListener = () => {
      if (name) channel.sendAnimationEvent(name, "finished");
    };

    if (events.canceled) {
      animation.addEventListener("cancel", cancelListener);
    }

    if (events.finished) {
      animation.addEventListener("finish", finishListener);
    }
    return () => {
      animation.removeEventListener("cancel", cancelListener);
      animation.removeEventListener("finish", finishListener);
      animation.cancel();
      channel.unsubscribe(listener);
    };
  }, [ref, options, channel, hasIntersected]);

  return {
    ref,
  };
};
