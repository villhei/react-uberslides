import React from "react";
import { CenteredLayout, DefaultLayout } from "react-slideshow";

const TestSlide: React.FC = () => (
  <CenteredLayout>
    <h1 style={{ fontSize: 100 }}> 100px font</h1>
    <div
      style={{
        width: 640,
        height: 480,
        border: "5px solid black",
      }}
    >
      <h1 style={{ fontSize: 100 }}>640x480 box</h1>
    </div>
  </CenteredLayout>
);

export default TestSlide;
