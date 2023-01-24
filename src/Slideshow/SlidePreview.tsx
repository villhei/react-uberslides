import { createRef } from "react";
import { useScaledContent } from "../utils";
import { Slide } from "../Slide";
import {
  useCreateAnimationContext,
  AnimationContextProvider,
} from "../AnimationContext";

type SlidePreviewProps = {
  slide: Slide;
  slideNumber: number;
  width?: number;
  height?: number;
  fontSize?: number | string;
};

export const SlidePreview = (props: SlidePreviewProps) => {
  const {
    slide: SlideContent,
    slideNumber,
    fontSize,
    width = 1920,
    height = 1080,
  } = props;

  const scaledWrapper = createRef<HTMLDivElement>();
  const scaledContent = createRef<HTMLDivElement>();

  useScaledContent(scaledContent, scaledWrapper);

  const animationContext = useCreateAnimationContext(false, {
    width,
    height,
  });

  return (
    <AnimationContextProvider value={animationContext}>
      <div
        className="react-uberslides-slideshow-preview-container"
        ref={scaledWrapper}
      >
        <div className="react-uberslides-slideshow-content-aligner">
          <div
            className="react-uberslides-slideshow-content-container"
            ref={scaledContent}
            style={{
              width,
              height,
            }}
          >
            <div
              className="react-uberslides-slideshow-slide"
              style={{
                width,
                height,
                fontSize,
              }}
            >
              <SlideContent slideNumber={slideNumber} fullscreen={false} />
            </div>
          </div>
        </div>
      </div>
    </AnimationContextProvider>
  );
};
