import React from "react";
import { DefaultLayout, Animate, timings } from "react-slideshow";

const Introduction: React.FC = () => {
  return (
    <DefaultLayout
      style={{
        padding: "0em 2em",
      }}
    >
      <Animate
        animation={[
          {
            offset: 0,
            color: "black",
            backgroundColor: "white",
            padding: "0em 2em",
          },
          {
            offset: 1,
            color: "white",
            backgroundColor: "black",
            padding: "1.5em 2em",
          },
        ]}
        delay={timings.slower}
      >
        <div
          style={{
            width: "calc(100% + 1em)",
            marginLeft: "-3em",
            backgroundColor: "white",
            padding: "0em 2em",
          }}
        >
          <h1>
            This is a slideshow
            <Animate delay={timings.default * 3}>
              <span style={{ opacity: 0 }}> 🚀</span>
            </Animate>
          </h1>
        </div>
      </Animate>
      <Animate delay={timings.default + timings.slower}>
        <ul style={{ opacity: 0 }}>
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
