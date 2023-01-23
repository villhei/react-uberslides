import React from "react";
import {
  DefaultLayout,
  Animate,
  timings,
  ReactSlidesAnimation,
} from "react-uberslides";

const backgroundExtend: ReactSlidesAnimation = {
  initialStyles: {
    color: "black",
    backgroundColor: "white",
    padding: "0em 4em",
  },
  keyframes: [
    {
      offset: 0,
      color: "black",
      backgroundColor: "white",
      padding: "0em 4em",
    },
    {
      offset: 1,
      color: "white",
      backgroundColor: "black",
      padding: "1.5em 4em",
    },
  ],
};

const Introduction: React.FC = () => {
  return (
    <DefaultLayout
      style={{
        padding: "0em 2em",
      }}
    >
      <Animate name="background-transition" animation={backgroundExtend}>
        <div
          style={{
            width: "calc(100% + 2em)",
            marginLeft: "-2em",
            color: "white",
            backgroundColor: "black",
            padding: "1.5em 4em",
          }}
        >
          <h1>
            This is a slideshow
            <Animate
              delay={timings.default}
              startOn={{
                name: "background-transition",
                event: "finished",
              }}
            >
              <span> 🚀</span>
            </Animate>
          </h1>
        </div>
      </Animate>
      <Animate
        startOn={{
          name: "background-transition",
          event: "finished",
        }}
      >
        <ul>
          <li>
            <pre style={{ display: "inline-block", margin: 0, color: "red" }}>
              react-slides
            </pre>{" "}
            is a slideshow framework
          </li>
          <li>The slides are React components</li>
          <li>Content can be static or animated</li>
        </ul>
      </Animate>
    </DefaultLayout>
  );
};

export default Introduction;
