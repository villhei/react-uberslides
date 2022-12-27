import React, { useEffect } from "react";


export function useSlideNavigation(containerElementRef: React.MutableRefObject<HTMLDivElement | null>, isFullscreen: boolean, eventHandler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keyup", eventHandler);
    } else if (containerElementRef.current) {
      containerElementRef.current.addEventListener("keyup", eventHandler);
    }

    return () => {
      if (isFullscreen) {
        document.addEventListener("keyup", eventHandler);
      } else if (containerElementRef.current) {
        containerElementRef.current.removeEventListener("keyup", eventHandler);
      }
    };
  }, [isFullscreen, containerElementRef, eventHandler]);
}