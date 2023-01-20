import React, { createRef } from "react";
import {
  DefaultLayout,
  Animate,
  AnimateSequence,
  animations,
  timings,
  animationConfigs,
} from "react-slideshow";

const Features: React.FC = () => {
  return (
    <DefaultLayout>
      <Animate
        delay={timings.slow}
        animation={[
          {
            backgroundPosition: "0%",
          },
          {
            backgroundPosition: "70%",
          },
        ]}
      >
        <div
          style={{
            padding: "0em 2em",
            fontSize: "1.5em",
            overflow: "hidden",
            background: "linear-gradient(110deg, white 60%, #5F819D 60%)",
            backgroundSize: "200% 200%",
            width: "100%",
            height: "100%",
          }}
        >
          <h1>
            <AnimateSequence
              animation={animations.fallIn}
              delay={timings.fastest}
              animationConfig={{
                ...animationConfigs.animateOnce,
                duration: timings.default,
              }}
            >
              {"FEATURES".split("").map((str, i) => (
                <span key={i} style={{ opacity: 0, display: "inline-block" }}>
                  {str}
                </span>
              ))}
            </AnimateSequence>
          </h1>
          <ul>
            <AnimateSequence
              initialDelay={
                timings.default + timings.fastest * "FEATURES".length + 1
              }
            >
              <li style={{ opacity: 0 }}>Embed anywhere</li>
              <li style={{ opacity: 0 }}>Mobile support</li>
              <li style={{ opacity: 0 }}>Animations</li>
              <li style={{ opacity: 0 }}>Slide recipes</li>
            </AnimateSequence>
          </ul>
        </div>
      </Animate>
    </DefaultLayout>
  );
};

export default Features;
