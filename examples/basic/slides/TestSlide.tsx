import React from "react";
import { CenteredLayout, DefaultLayout } from "react-slideshow";

const TestSlide: React.FC = () => (
  <CenteredLayout>
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          minWidth: "100%",
          display: "inline-block",
          alignSelf: "center",
        }}
      ></div>
    </div>
  </CenteredLayout>
);

export default TestSlide;
