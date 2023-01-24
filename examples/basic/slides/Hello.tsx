import React from "react";
import { Animate, CenteredLayout, animations } from "react-uberslides";

const Hello: React.FC = () => (
  <CenteredLayout
    style={{
      color: "white",
      backgroundColor: "black",
    }}
  >
    <h1 style={{ fontSize: "4em" }}>Hello!</h1>
    <Animate animation={animations.fallIn}>
      <div>
        <h3>Use the arrows or swipe to navigate</h3>
      </div>
    </Animate>
  </CenteredLayout>
);

export default Hello;
