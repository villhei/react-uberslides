import React, { createRef, useEffect, useMemo, useRef } from "react";
import { useAnimationContext } from "../AnimationContext";

type MatrixProps = {
  color?: string;
  fontSize?: number;
  dimensions?: { width: number; height: number };
};

export const Matrix = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<"div"> & MatrixProps
>((props, ref) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  const { color = "#0f0", fontSize = 35, dimensions: dimensionsProps } = props;

  const { animationsEnabled, dimensions: contextDimensions } =
    useAnimationContext();

  const dimensions = dimensionsProps ?? contextDimensions;
  const initialValues = useMemo(() => {
    const fontMargin = 0.2;
    const fontSpace = fontSize * (1 + fontMargin);
    const { width, height } = dimensions;
    const columnCount = Math.floor(width / fontSpace) + 1;
    const rowCount = Math.floor(height / fontSpace);

    return {
      fontSpace,
      width,
      height,
      columnCount,
      rowCount,
      color,
      fontSize,
    };
  }, [dimensionsProps, dimensions, color, fontSize]);

  const drawCursorRef = useRef(
    Array(initialValues.columnCount)
      .fill(0)
      .map(
        () =>
          initialValues.fontSpace +
          Math.floor(Math.random() * initialValues.rowCount - 1) *
            initialValues.fontSpace
      )
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const { current: cursorY } = drawCursorRef;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d")!;

    const { fontSpace, width, height, rowCount } = initialValues;

    const lastRow = height / fontSpace;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    function matrix() {
      ctx.fillStyle = "#0003";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.textAlign = "left";
      ctx.font = `${fontSize}px monospace`;

      cursorY.forEach((row, ind) => {
        // Magic numbers to restrict the range to renderable characters https://www.w3schools.com/charsets/ref_html_ascii.asp
        const character = String.fromCharCode(
          33 + Math.floor(Math.random() * 93)
        );
        const x = ind * fontSpace;
        ctx.fillText(character, x, row);
        if (row > lastRow + Math.random() * 100000) cursorY[ind] = fontSpace;
        else cursorY[ind] = row + fontSpace;
      });
    }

    let frame = 0;
    let isRunning = true;

    const render = () =>
      requestAnimationFrame(() => {
        if (++frame % 4 === 0) {
          matrix();
        }
        if (isRunning) {
          render();
        }
      });

    if (animationsEnabled) {
      render();
    } else {
      for (let i = 0; i < rowCount; i++) {
        matrix();
      }
    }

    return () => {
      isRunning = false;
    };
  }, [canvasRef, animationsEnabled, initialValues]);

  return (
    <div ref={ref} style={{ ...props.style, ...dimensions }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
});
