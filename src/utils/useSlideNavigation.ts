import React, { useEffect, useRef } from "react";

export enum SlideNavigationAction {
  NEXT_SLIDE,
  PREV_SLIDE,
}

const interpretCommand = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft": {
      return SlideNavigationAction.PREV_SLIDE;
    }
    case "ArrowRight": {
      return SlideNavigationAction.NEXT_SLIDE;
    }
    default: {
      return null;
    }
  }
};

type TouchCoord = {
  x: number | null;
  y: number | null;
};

export function useSlideNavigation(
  containerElementRef: React.MutableRefObject<HTMLDivElement | null>,
  isFullscreen: boolean,
  actionHandler: (action: SlideNavigationAction) => void
) {
  const touchRef = useRef<TouchCoord>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      const command = interpretCommand(event);

      if (command !== null) {
        event.preventDefault();
        actionHandler(command);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchRef.current.x = event.changedTouches[0].screenX;
      touchRef.current.y = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const { screenX: touchendX } = event.changedTouches[0];
      if (touchRef.current.x !== null && touchendX < touchRef.current.x) {
        actionHandler(SlideNavigationAction.NEXT_SLIDE);
      }
      if (touchRef.current.x !== null && touchendX > touchRef.current.x) {
        actionHandler(SlideNavigationAction.PREV_SLIDE);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keyup", keyboardHandler);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", handleTouchEnd);
    } else if (containerElementRef.current) {
      containerElementRef.current.addEventListener("keyup", keyboardHandler);
      containerElementRef.current.addEventListener(
        "touchstart",
        handleTouchStart
      );
      containerElementRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (isFullscreen) {
        document.removeEventListener("keyup", keyboardHandler);
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchEnd);
      } else if (containerElementRef.current) {
        containerElementRef.current.removeEventListener(
          "keyup",
          keyboardHandler
        );
        containerElementRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        containerElementRef.current.removeEventListener(
          "touchmove",
          handleTouchEnd
        );
      }
    };
  }, [isFullscreen, containerElementRef]);
}
