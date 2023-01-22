import React from "react";
import { Animate, CenteredLayout, animations } from "react-slideshow";

const OtherSlide: React.FC = () => (
  <CenteredLayout
    style={{
      fontSize: "1.5em",
      color: "white",
      backgroundColor: "black",
    }}
  >
    <h1>Hello!</h1>
    <Animate animation={animations.fallIn}>
      <div>
        <h3>Use the arrows or swipe to navigate</h3>
      </div>
    </Animate>
  </CenteredLayout>
);

export default OtherSlide;
