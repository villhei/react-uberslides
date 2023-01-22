import React, { useEffect } from "react";

export const useScaledContent = (
  scaledContent: React.RefObject<HTMLElement>,
  scaledWrapper: React.RefObject<HTMLElement>
) => {
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
};
