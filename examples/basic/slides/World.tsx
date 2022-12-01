import React from "react";
import { DefaultLayout } from "react-slideshow";

const ThirdSlide: React.FC = () => (
  <DefaultLayout
    style={{
      fontSize: "100px",
      backgroundColor: "green",
    }}
  >
    <h1>World!</h1>
    <h1>World!</h1>
  </DefaultLayout>
);

export default ThirdSlide;
