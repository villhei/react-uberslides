import React from "react";
import { Animate, DefaultLayout } from "react-uberslides";

const TestSlide: React.FC = () => (
  <DefaultLayout
    style={{
      padding: "0em 2em",
    }}
  >
    <Animate name="test">
      <h1>The System</h1>
    </Animate>
    <ul>
      <li>
        <pre style={{ display: "inline-block", margin: 0, color: "red" }}>
          react-uberslides
        </pre>{" "}
        enforces a given aspect ratio
      </li>
      <li>These slides assume 1920x1080 content</li>
      <li>...but will be scaled to fit</li>
    </ul>
  </DefaultLayout>
);

export default TestSlide;
