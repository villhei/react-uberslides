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
        startOn={{
          name: "logo-enter",
          event: "finished",
        }}
        name="background-slide"
        animation={{
          initialStyles: {
            backgroundPosition: "0%",
          },
          keyframes: [
            {
              backgroundPosition: "0%",
            },
            {
              backgroundPosition: "70%",
            },
          ],
        }}
      >
        <div
          style={{
            padding: "0em 2em",
            fontSize: "1.5em",
            overflow: "hidden",
            background: "linear-gradient(110deg, white 60%, #5F819D 60%)",
            backgroundPosition: "70%",
            backgroundSize: "200% 200%",
            width: "100%",
            height: "100%",
          }}
        >
          <h1>
            <AnimateSequence
              name="logo-enter"
              animation={animations.fallIn}
              animationConfig={{
                ...animationConfigs.animateOnce,
                duration: timings.fastest,
              }}
            >
              {"FEATURES".split("").map((str, i) => (
                <span key={i} style={{ display: "inline-block" }}>
                  {str}
                </span>
              ))}
            </AnimateSequence>
          </h1>
          <ul>
            <AnimateSequence
              startOn={{
                name: "background-slide",
                event: "finished",
              }}
            >
              <li>Embed anywhere</li>
              <li>Mobile support</li>
              <li>Animations</li>
              <li>Slide recipes</li>
            </AnimateSequence>
          </ul>
        </div>
      </Animate>
    </DefaultLayout>
  );
};

export default Features;
