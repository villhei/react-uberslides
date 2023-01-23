import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import {
  SlideNavigationAction,
  useSlideNavigation,
} from "../utils/useSlideNavigation";
import { slideTransitions } from "../constants";
import DummySlide from "./DummySlide";
import { animationConfigs } from "../Animations/animationConfigs";
import { resolveNextSlide } from "../utils/resolveNextSlide";
import { Slide } from "../Slide/";
import { useScaledContent } from "../utils";
import {
  AnimationContextProvider,
  useCreateAnimationContext,
} from "../AnimationContext";
import "./Slideshow.css";

export type SlideTransitionStyle = "fade" | "slide";

export type SlideshowProps = {
  slides: Slide[];
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

  const [slideEnterAnimation, setSlideEnterAnimation] =
    useState<SlideAnimation>({
      style: slideTransitions.fadeIn,
      options: animationConfigs.animateOnce,
    });

  const isFullscreenRef = useRef<boolean>(fullscreenProp);

  const animationContext = useCreateAnimationContext(true, { width, height });

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

      animation.onfinish = () => {
        animationContext.sendAnimationEvent("slide-exit", "finished");
      };

      const nextSlideNumber = resolveNextSlide(
        slides.length,
        slideNumber,
        action
      );
      animation.addEventListener("finish", () => {
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

  useScaledContent(scaledContent, scaledWrapper);

  useEffect(() => {
    const { current } = activeSlideRef;
    if (!current) {
      return;
    }
    const { style, options } = slideEnterAnimation;
    const animation = current.animate(style, options);

    animation.onfinish = () => {
      animationContext.sendAnimationEvent("slide-enter", "finished");
    };
  }, [activeSlideRef.current, animationContext, slideEnterAnimation]);

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
    <AnimationContextProvider value={animationContext}>
      <div
        tabIndex={fullscreenProp ? undefined : 0}
        role="document"
        className="react-uberslides-slideshow-main-container"
        ref={scaledWrapper}
      >
        <div className="react-uberslides-slideshow-content-aligner">
          <div
            ref={scaledContent}
            className="react-uberslides-slideshow-content-container"
            style={{
              width: pixelWidth,
              height: pixelHeight,
            }}
          >
            <div
              className="react-uberslides-slideshow-slide"
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
    </AnimationContextProvider>
  );
};
