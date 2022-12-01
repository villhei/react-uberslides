import React, { createRef, useEffect, useMemo, useState } from "react";
import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { SlideContainer } from "../SlideContainer/SlideContainer";
import { timings } from "../constants";

const processKey = (event: KeyboardEvent, slideNumber: number) => {
  switch (event.key) {
    case "ArrowLeft": {
      return slideNumber - 1;
    }
    case "ArrowRight": {
      return slideNumber + 1;
    }
    default: {
      return null;
    }
  }
};

type SlideShowProps = {
  slides: React.FC[];
  width?: number;
  height?: number;
  slideNumber?: number;
  onRequestSlide: (nextSlideNumber: number) => void;
  fullScreen?: boolean;
  onExitFullScreen?: () => void;
};

export const Slideshow = (props: SlideShowProps) => {
  const {
    slides,
    slideNumber = 0,
    onRequestSlide,
    width = 1920,
    height = 1080,
    fullScreen = false,
    onExitFullScreen,
  } = props;

  const navigate = useNavigate();

  const scaledWrapper = createRef<HTMLDivElement>();
  const scaledContent = createRef<HTMLDivElement>();
  const activeSlideRef = createRef<HTMLDivElement>();

  const ActiveSlide = useMemo(
    () => () => {
      const SlideContent = slides[slideNumber];
      return <SlideContent />;
    },
    [slides, slideNumber]
  );

  const nextSlide = useCallback(
    (event: KeyboardEvent) => {
      console.log({ activeSlideRef });
      const { current } = activeSlideRef;
      if (!current || event.defaultPrevented) {
        return;
      }

      const nextSlideNumber = processKey(event, slideNumber);

      if (nextSlideNumber === null) {
        return;
      }

      const animation = current.animate(
        [
          { opacity: 1, offset: 0.0 },
          { opacity: 1, offset: 0.2 },
          { opacity: 0, offset: 0.8 },
          { opacity: 0, offset: 1.0 },
        ],
        {
          iterations: 1,
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
    [slideNumber, navigate, activeSlideRef]
  );

  useEffect(() => {
    document.addEventListener("keyup", nextSlide);

    return () => {
      document.removeEventListener("keyup", nextSlide);
    };
  }, [nextSlide]);

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
    if (fullScreen) {
      scaledWrapper.current.requestFullscreen({ navigationUI: "show" });
    }
    if (onExitFullScreen) {
      scaledWrapper.current.addEventListener("fullscreenchange", (event) => {
        if (document.fullscreenElement) {
          onExitFullScreen();
        }
      });
    }
  }, [fullScreen, onExitFullScreen, nextSlide]);

  const pixelWidth = `${width}px`;
  const pixelHeight = `${height}px`;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "black",
      }}
      ref={scaledWrapper}
    >
      <div
        style={{
          display: "flex",
          flex: "1 1",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1,
        }}
      >
        <div
          ref={scaledContent}
          style={{
            width: pixelWidth,
            height: pixelHeight,
            backgroundColor: "black",
          }}
        >
          <SlideContainer
            ref={activeSlideRef}
            width={pixelWidth}
            height={pixelHeight}
          >
            <ActiveSlide />
          </SlideContainer>
        </div>
      </div>
    </div>
  );
};
