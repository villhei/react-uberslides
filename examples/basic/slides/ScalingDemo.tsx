import React, { useState } from "react";
import {
  DefaultLayout,
  SlidePreview,
  CenteredLayout,
  Animate,
  animations,
} from "react-uberslides";

type Variant = {
  aspect: string;
  width: number;
  height: number;
  fontSize: number;
};

const variants: Variant[] = [
  {
    aspect: "4/3",
    width: 640,
    height: 480,
    fontSize: 20,
  },
  {
    aspect: "3/4",
    width: 480,
    height: 640,
    fontSize: 20,
  },
  {
    aspect: "16/9",
    width: 1920,
    height: 1080,
    fontSize: 60,
  },
  {
    aspect: "21/9",
    width: 3440,
    height: 1440,
    fontSize: 80,
  },
];
const ScalingDemo: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleOpenExample = (variant: Variant) => {
    setSelectedVariant(variant);
  };
  return (
    <DefaultLayout
      style={{
        color: "white",
      }}
      className="grid-background grid-view"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>
          Scaling <Animate>and interactivity 🪄 </Animate>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          padding: "2rem",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Animate>
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              marginBottom: "1em",
            }}
          >
            <SlidePreview
              slideNumber={0}
              {...selectedVariant}
              slide={() => (
                <CenteredLayout
                  className="grid-background"
                  style={{
                    padding: "0.5em",
                    backgroundColor: "#368c30",
                    ...selectedVariant,
                  }}
                >
                  <h1>Look! Mama I'm on TV! 📺</h1>
                  <div style={{ textAlign: "left", width: "50%" }}>
                    <pre style={{ fontSize: "1.3em" }}>
                      {JSON.stringify(selectedVariant, null, 2)}
                    </pre>
                    fontSize, the basis of "1em"
                  </div>
                </CenteredLayout>
              )}
            />
          </div>
        </Animate>
        <div
          style={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Choose slide size</h2>
          {variants.map((variant, i) => (
            <Button
              variant={variant}
              key={i}
              onClick={() => handleOpenExample(variant)}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

type ButtonProps = {
  variant: Variant;
  onClick: () => void;
  style?: React.CSSProperties;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button ref={ref} onClick={props.onClick} style={props.style as any}>
      {props.variant.aspect} - {props.variant.width}x{props.variant.height}
    </button>
  )
);

export default ScalingDemo;
