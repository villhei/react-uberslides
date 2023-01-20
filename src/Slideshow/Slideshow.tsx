import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import {
  SlideNavigationAction,
  useSlideNavigation,
} from "../utils/useSlideNavigation";
import { slideTransitions } from "../constants";
import DummySlide from "./DummySlide";
import "./Slideshow.css";
import { animationConfigs } from "../constants/animationConfigs";
import { resolveNextSlide } from "../utils/resolveNextSlide";

export type SlideTransitionStyle = "fade" | "slide";

export type SlideshowProps = {
  slides: React.FC<{ slideNumber?: number }>[];
  width?: number;
  height?: number;
  slideNumber?: number;
  onRequestSlide: (nextSlideNumber: number) => void;
  fullscreen?: boolean;
  onExitFullscreen?: () => void;
  transitionStyle?: SlideTransitionStyle;
};

const chooseSlideEnterAnimation = (
  transitionStyle: SlideTransitionStyle,
  action: SlideNavigationAction | null
) => {
  if (transitionStyle === "slide") {
    if (action === SlideNavigationAction.NEXT_SLIDE) {
      return slideTransitions.slideFromRight;
    }
    if (action === SlideNavigationAction.PREV_SLIDE) {
      return slideTransitions.slideFromLeft;
    }
  }
  return slideTransitions.fadeIn;
};

type SlideAnimation = {
  style: Keyframe[];
  options: KeyframeAnimationOptions;
};
const chooseSlideExitAnimation = (
  transitionStyle: SlideTransitionStyle,
  action: SlideNavigationAction
) => {
  if (transitionStyle === "slide") {
    if (action === SlideNavigationAction.NEXT_SLIDE) {
      return slideTransitions.slideLeft;
    }
    if (action === SlideNavigationAction.PREV_SLIDE) {
      return slideTransitions.slideRight;
    }
  }
  return slideTransitions.fadeOut;
};

export const Slideshow = (props: SlideshowProps) => {
  const {
    slides,
    slideNumber = 0,
    onRequestSlide,
    width = 1920,
    height = 1080,
    fullscreen: fullscreenProp = false,
    onExitFullscreen,
    transitionStyle = "fade",
  } = props;

  const scaledWrapper = createRef<HTMLDivElement>();
  const scaledContent = createRef<HTMLDivElement>();
  const activeSlideRef = createRef<HTMLDivElement>();
  const previousSlideNumber = useRef<number>();
  const [slideEnterAnimation, setSlideEnterAnimation] =
    useState<SlideAnimation>({
      style: slideTransitions.fadeIn,
      options: animationConfigs.animateOnce,
    });

  const isFullscreenRef = useRef<boolean>(fullscreenProp);

  const ActiveSlide = useMemo(
    () => () => {
      const SlideContent = slides[slideNumber] || DummySlide;
      return <SlideContent slideNumber={slideNumber} />;
    },
    [slides, slideNumber]
  );

  const handleSlideCommands = useCallback(
    (action: SlideNavigationAction) => {
      const { current } = activeSlideRef;
      if (!current) {
        return;
      }

      const exitAnimationStyle = chooseSlideExitAnimation(
        transitionStyle,
        action
      );

      const animation = current.animate(
        exitAnimationStyle,
        animationConfigs.animateOnce
      );
      const nextSlideNumber = resolveNextSlide(
        slides.length,
        slideNumber,
        action
      );
      animation.addEventListener("finish", () => {
        previousSlideNumber.current = slideNumber;
        const enterAnimationStyle = chooseSlideEnterAnimation(
          transitionStyle,
          action
        );

        setSlideEnterAnimation({
          style: enterAnimationStyle,
          options: animationConfigs.animateOnce,
        });
        onRequestSlide(nextSlideNumber);
      });
    },
    [slideNumber, activeSlideRef, setSlideEnterAnimation, transitionStyle]
  );

  useSlideNavigation(scaledWrapper, fullscreenProp, handleSlideCommands);

  useEffect(() => {
    const { current } = activeSlideRef;
    if (!current) {
      return;
    }
    const { style, options } = slideEnterAnimation;
    current.animate(style, options);
  }, [activeSlideRef, slideEnterAnimation]);

  useEffect(() => {
    const listener = () => {
      if (!scaledContent.current || !scaledWrapper.current) {
        return;
      }
      scaledContent.current.style.transform = "scale(1, 1)";

      const { width: cw, height: ch } =
        scaledContent.current.getBoundingClientRect();
      const { width: ww, height: wh } =
        scaledWrapper.current.getBoundingClientRect();
      const scaleAmtX = Math.min(ww / cw, wh / ch);

      scaledContent.current.style.transform = `scale(${scaleAmtX}) `;
    };
    listener();
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [scaledWrapper, scaledContent]);

  useEffect(() => {
    if (!scaledWrapper.current) {
      return;
    }
    if (fullscreenProp && !isFullscreenRef.current) {
      scaledWrapper.current.style.opacity = "0";
      scaledWrapper.current
        .requestFullscreen({ navigationUI: "show" })
        .then(() => {
          scaledWrapper.current!.animate(
            slideTransitions.fadeIn,
            animationConfigs.animateOnceSlowly
          );
          isFullscreenRef.current = true;
        });

      const listener = (_event: Event) => {
        if (!document.fullscreenElement) {
          isFullscreenRef.current = false;
          if (onExitFullscreen) {
            onExitFullscreen();
          }
          document.removeEventListener("fullscreenchange", listener);
        }
      };
      document.addEventListener("fullscreenchange", listener);
    }
  }, [isFullscreenRef, fullscreenProp, onExitFullscreen]);

  const pixelWidth = `${width}px`;
  const pixelHeight = `${height}px`;

  return (
    <div
      tabIndex={fullscreenProp ? undefined : 0}
      role="document"
      className="react-slideshow-main-container"
      ref={scaledWrapper}
    >
      <div className="react-slideshow-content-aligner">
        <div
          ref={scaledContent}
          className="react-slideshow-content-container"
          style={{
            width: pixelWidth,
            height: pixelHeight,
          }}
        >
          <div
            className="react-slideshow-slide"
            style={{
              width,
              height,
            }}
            ref={activeSlideRef}
          >
            <ActiveSlide />
          </div>
        </div>
      </div>
    </div>
  );
};
