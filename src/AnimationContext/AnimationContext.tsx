import { PropsWithChildren, useContext, createContext, useMemo } from "react";
import { AnimationEvent, AnimationMessageHandler } from "./animationMessage";

type AnimationMessageBroker = {
  sendAnimationEvent: (name: string, event: AnimationEvent) => void;
  subscribe: (cb: AnimationMessageHandler) => void;
  unsubscribe: (cb: AnimationMessageHandler) => void;
};

type WindowDimensions = {
  width: number;
  height: number;
};
type AnimationContext = AnimationMessageBroker & {
  animationsEnabled: boolean;
  dimensions: WindowDimensions;
};

export const animationMessageBroker = (): AnimationMessageBroker => {
  const listeners: AnimationMessageHandler[] = [];

  const subscribe = (cb: AnimationMessageHandler) => {
    listeners.push(cb);
  };

  const unsubscribe = (cb: AnimationMessageHandler) => {
    const i = listeners.indexOf(cb);
    if (i > -1) {
      listeners.splice(i, 1);
    }
  };

  const sendAnimationEvent = (name: string, event: AnimationEvent) => {
    console.log("Broadcast", JSON.stringify({ name, event }));
    listeners.forEach((cb) =>
      cb({
        name,
        event,
      })
    );
  };

  return {
    sendAnimationEvent,
    subscribe,
    unsubscribe,
  };
};

export const AnimationContextProvider = (
  props: PropsWithChildren<{ value: AnimationContext }>
) => {
  const { Provider } = AnimationEvents;

  return <Provider {...props} />;
};

const createAnimationContext = (
  animationsEnabled: boolean,
  dimensions: WindowDimensions
) => ({
  ...animationMessageBroker(),
  dimensions,
  animationsEnabled,
});

export const useCreateAnimationContext = (
  animationsEnabled: boolean,
  dimensions: WindowDimensions
): AnimationContext => {
  const animationContext = useMemo(
    () => createAnimationContext(animationsEnabled, dimensions),
    [animationsEnabled, dimensions]
  );

  return animationContext;
};

const AnimationEvents = createContext<AnimationContext>(
  createAnimationContext(false, { width: 1920, height: 1080 })
);

export const useAnimationContext = () => {
  return useContext(AnimationEvents);
};
