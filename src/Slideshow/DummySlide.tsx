import React from "react";
import { CenteredLayout } from "../Layouts";

type DummySlideProps = {
  slideNumber: number;
};

const DummySlide: React.FC<DummySlideProps> = (props) => (
  <CenteredLayout
    style={{
      fontSize: "100px",
      color: "white",
      backgroundColor: "black",
    }}
  >
    <h1>Hello!</h1>
    <h3>I have nothing to show you!</h3>
    <h4>This is the slide number {props.slideNumber}!</h4>
  </CenteredLayout>
);

export default DummySlide;
