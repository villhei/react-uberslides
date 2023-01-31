import React from "react";
import {
  Animate,
  AnimateSequence,
  animationConfigs,
  animations,
  CenteredLayout,
  DefaultLayout,
  Matrix,
  timings,
} from "react-uberslides";

const styles = {
  layout: {
    position: "absolute",
    backgroundColor: "transparent",
    letterSpacing: "2.5px",
    top: 0,
    left: 0,
    color: "white",
  },
  heading: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
  absolute: {
    position: "absolute",
    overflow: "hidden",
  },
  relativeFlex: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
} as const;

const events = {
  background: { name: "background-fade", event: "finished" },
  headline: { name: "headlines-appear", event: "finished" },
  matrix: { name: "matrix-appear", event: "finished" },
} as const;

const MadHackerPresentations: React.FC = () => {
  return (
    <DefaultLayout style={styles.relativeFlex}>
      <Animate
        name={events.matrix.name}
        animation={{
          initialStyles: { maxHeight: "0%" },
          keyframes: [{ maxHeight: "0%" }, { maxHeight: "100%" }],
        }}
        delay={timings.slow}
        duration={timings.slow}
      >
        <div style={styles.absolute}>
          <Matrix />
        </div>
      </Animate>
      <CenteredLayout style={styles.layout}>
        <Animate
          animation={animations.flipColors}
          startOn={{ name: events.matrix.name, event: "started" }}
          delay={timings.slow}
        >
          <h1>
            Create{" "}
            <Animate
              startOn={events.headline}
              animation={{
                initialStyles: { color: "unset" },
                keyframes: [
                  {
                    color: "unset",
                  },
                  { color: "red" },
                ],
              }}
            >
              <span style={{ color: "red" }}>overkill</span>
            </Animate>{" "}
            effects
          </h1>
        </Animate>
        <AnimateSequence
          startOn={events.matrix}
          animationConfig={animationConfigs.animateOnceSlowly}
          name={events.headline.name}
          initialDelay={timings.slowest}
        >
          <h2>Combine HTML + CSS + JS</h2>
          <h3>...and your ideas</h3>
        </AnimateSequence>
      </CenteredLayout>
    </DefaultLayout>
  );
};

export default MadHackerPresentations;
