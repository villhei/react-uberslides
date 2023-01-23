import { createRef } from "react";
import { useScaledContent } from "../utils";
import { Slide } from "../Slide";

type SlidePreviewProps = {
  slide: Slide;
  slideNumber: number;
  width?: string;
  height?: string;
};

export const SlidePreview = (props: SlidePreviewProps) => {
  const {
    slide: SlideContent,
    slideNumber,
    width = 1920,
    height = 1080,
  } = props;

  const scaledWrapper = createRef<HTMLDivElement>();
  const scaledContent = createRef<HTMLDivElement>();

  useScaledContent(scaledContent, scaledWrapper);

  return (
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
            }}
          >
            <SlideContent slideNumber={slideNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};
