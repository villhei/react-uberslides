import React, { createRef, useEffect, useMemo } from "react";
import { useAnimationContext } from "../AnimationContext";

type MatrixProps = {
  color?: string;
  fontSize?: number;
};

export const Matrix = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<MatrixProps>
>((props, ref) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  const { color = "#0f0", fontSize = 35 } = props;

  const { animationsEnabled, dimensions } = useAnimationContext();

  const styles = useMemo(
    () =>
      ({
        absolute: {
          position: "absolute",
          width: dimensions.width,
          height: dimensions.height,
        },
        relative: {
          position: "relative",
          width: dimensions.width,
          height: dimensions.height,
        },
        absoluteFlex: {
          position: "absolute",
          display: "flex",
          width: dimensions.width,
          height: dimensions.height,
        },
      } as const),
    [dimensions]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d")!;

    const fontMargin = 0.2;
    const fontSpace = fontSize * (1 + fontMargin);
    const width = (canvas.width = document.body.offsetWidth);
    const height = (canvas.height = document.body.offsetHeight);
    const columnCount = Math.floor(width / fontSpace) + 1;
    const rowCount = Math.floor(height / fontSpace);

    const cursorY = Array(columnCount)
      .fill(0)
      .map(
        () => fontSpace + Math.floor(Math.random() * rowCount - 1) * fontSpace
      );

    const lastRow = height / fontSpace;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    function matrix() {
      ctx.fillStyle = "#0002";
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
  }, [canvasRef, animationsEnabled, color, fontSize]);

  return (
    <div ref={ref} style={styles.relative}>
      <canvas ref={canvasRef} style={styles.absolute} />
      <div style={styles.absoluteFlex}>{props.children}</div>
    </div>
  );
});
