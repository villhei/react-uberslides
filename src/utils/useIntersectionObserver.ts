import { useEffect, createRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(
  rootMargin = "0%"
) => {
  const ref = createRef<T>();

  const [hasIntersected, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = ref?.current;

    if (!window.IntersectionObserver || !node || hasIntersected) {
      return;
    }

    const updateEntry = (entries: IntersectionObserverEntry[]): void => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach(() => setIntersecting(true));
    };

    const observer = new IntersectionObserver(updateEntry, { rootMargin });

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, hasIntersected]);

  return { ref, hasIntersected };
};

export default useIntersectionObserver;
