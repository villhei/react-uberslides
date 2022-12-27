import React, { createRef, useEffect, useMemo, useRef } from "react";
import { useCallback } from "react";
import { SlideAction, useSlideNavigation } from "../utils/useSlideNavigation";
import { timings } from "../constants";
import DummySlide from "./DummySlide";
import "./Slideshow.css";

export type SlideshowProps = {
  slides: React.FC<{ slideNumber?: number }>[];
  width?: number;
  height?: number;
  slideNumber?: number;
  onRequestSlide: (nextSlideNumber: number) => void;
  fullscreen?: boolean;
  onExitFullscreen?: () => void;
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
  } = props;

  const scaledWrapper = createRef<HTMLDivElement>();
  const scaledContent = createRef<HTMLDivElement>();
  const activeSlideRef = createRef<HTMLDivElement>();

  const isFullscreenRef = useRef<boolean>(fullscreenProp);

  const ActiveSlide = useMemo(
    () => () => {
      const SlideContent = slides[slideNumber] || DummySlide;
      return <SlideContent slideNumber={slideNumber} />;
    },
    [slides, slideNumber]
  );

  const handleSlideCommands = useCallback(
    (action: SlideAction) => {
      const { current } = activeSlideRef;
      if (!current) {
        return;
      }

      const nextSlideNumber =
        action === SlideAction.NEXT_SLIDE ? slideNumber + 1 : slideNumber - 1;

      const animation = current.animate(
        [
          { opacity: 1, offset: 0.0 },
          { opacity: 1, offset: 0.2 },
          { opacity: 0, offset: 0.8 },
          { opacity: 0, offset: 1.0 },
        ],
        {
          iterations: 1,
          easing: "ease-in-out",
          duration: timings.default,
          fill: "forwards",
        }
      );
      animation.addEventListener("finish", () => {
        if (nextSlideNumber === slides.length) {
          onRequestSlide(0);
        } else if (nextSlideNumber === -1) {
          onRequestSlide(slides.length - 1);
        } else {
          onRequestSlide(nextSlideNumber);
        }
      });
    },
    [slideNumber, activeSlideRef]
  );

  useSlideNavigation(scaledWrapper, fullscreenProp, handleSlideCommands);

  useEffect(() => {
    const { current } = activeSlideRef;
    if (!current) {
      return;
    }
    current.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.2 },
        { opacity: 1, offset: 0.8 },
        { opacity: 1, offset: 1.0 },
      ],
      {
        iterations: 1,
        easing: "ease-in-out",
        duration: timings.default,
        fill: "forwards",
      }
    );
  }, [activeSlideRef, slideNumber]);

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
            [
              { opacity: 0, offset: 0 },
              { opacity: 0, offset: 0.4 },
              { opacity: 1, offset: 1.0 },
            ],
            {
              iterations: 1,
              easing: "ease-in-out",
              duration: timings.slowest,
              fill: "forwards",
            }
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
