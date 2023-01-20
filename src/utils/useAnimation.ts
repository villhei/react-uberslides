import { useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export const useAnimation = <T extends HTMLElement>(
  keyframes: Array<Keyframe>,
  config: KeyframeAnimationOptions
) => {
  const { ref, hasIntersected } = useIntersectionObserver<T>();

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasIntersected) {
      return;
    }

    const animation = node.animate(keyframes, config);

    animation.play();
    return () => {
      animation.cancel();
    };
  }, [ref, hasIntersected]);

  return {
    ref,
  };
};
