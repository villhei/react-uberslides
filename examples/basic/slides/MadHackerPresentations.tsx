import React from "react";
import {
  Animate,
  AnimateSequence,
  animationConfigs,
  animations,
  CenteredLayout,
  DefaultLayout,
  Matrix,
} from "react-slideshow";

const styles = {
  layout: {
    backgroundColor: "transparent",
    letterSpacing: "2.5px",
    fontSize: 60,
    color: "white",
  },
  heading: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
};

const events = {
  background: { name: "background-fade", event: "finished" },
} as const;

const MadHackerPresentations: React.FC = () => {
  return (
    <DefaultLayout backgroundColor="black">
      <Animate name="background-fade">
        <Matrix fontSize={40}>
          <CenteredLayout style={styles.layout}>
            <AnimateSequence
              animation={animations.flipColors}
              animationConfig={animationConfigs.animateOnceSlowly}
              startOn={events.background}
            >
              <h1 style={styles.heading}>Create overkill effects</h1>
              <h2 style={styles.heading}>With HTML + CSS + JS</h2>
              <h3 style={styles.heading}>And your creativity</h3>
            </AnimateSequence>
          </CenteredLayout>
        </Matrix>
      </Animate>
    </DefaultLayout>
  );
};

export default MadHackerPresentations;
