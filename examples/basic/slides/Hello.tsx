import React from "react";
import { CenteredLayout } from "react-slideshow";

const OtherSlide: React.FC = () => (
  <CenteredLayout
    style={{
      fontSize: "100px",
      color: "white",
      backgroundColor: "black",
    }}
  >
    <h1>Hello!</h1>
  </CenteredLayout>
);

export default OtherSlide;
