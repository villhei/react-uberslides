import { PropsWithChildren, useContext, createContext } from "react";
import { AnimationEvent, AnimationMessageHandler } from "./animationMessage";

type AnimationContext = {
  sendAnimationEvent: (name: string, event: AnimationEvent) => void;
  subscribe: (cb: AnimationMessageHandler) => void;
  unsubscribe: (cb: AnimationMessageHandler) => void;
  animationsEnabled: boolean;
};

export const animationMessageBroker = (
  animationsEnabled: boolean
): AnimationContext => {
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
    animationsEnabled,
  };
};

const AnimationEvents = createContext<AnimationContext>(
  animationMessageBroker(false)
);

export const AnimationEventsProvider = (
  props: PropsWithChildren<{ value: AnimationContext }>
) => {
  const { Provider } = AnimationEvents;

  return <Provider {...props} />;
};

export const useAnimationEventsChannel = () => {
  return useContext(AnimationEvents);
};
