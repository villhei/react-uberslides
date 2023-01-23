import { HTMLAttributes, PropsWithChildren } from "react";
import {
  Animate,
  AnimateSequence,
  DefaultLayout,
  animations,
  timings,
} from "react-uberslides";

const events = {
  title: {
    name: "title-appear",
    event: "finished",
  },
  border: {
    name: "border-appear",
    event: "finished",
  },
  bulletPoints: {
    name: "bullets-appear",
    event: "finished",
  },
} as const;
const TestSlide = () => {
  return (
    <DefaultLayout
      style={{
        padding: "0em 2em",
      }}
    >
      <h1 style={{ marginBottom: "0.2em" }}>The System</h1>
      <Animate animation={animations.growVertical} name="border-appear">
        <div
          style={{
            background: "black",
            width: "100%",
            height: "0.25em",
            marginBottom: "1em",
          }}
        />
      </Animate>
      <ul>
        <AnimateSequence
          startOn={events.border}
          name={events.bulletPoints.name}
        >
          <li>
            <pre style={{ display: "inline-block", margin: 0, color: "red" }}>
              react-uberslides
            </pre>{" "}
            enforces a given aspect ratio (eg. 16:9)
          </li>
          <li>Slides are assumed to be of same size (eg. 1920x1080)</li>
          <li>
            With those assumptions, content is scaled to fit a given container
          </li>
        </AnimateSequence>
      </ul>
      <Animate startOn={events.bulletPoints} delay={timings.slow}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box style={{ width: 400, height: 100, border: "5px solid black" }}>
            400 x 100
          </Box>
          <Box style={{ width: 400, height: 200, border: "5px solid black" }}>
            400 x 200
          </Box>
          <Box style={{ width: 400, height: 300, border: "5px solid black" }}>
            400 x 300
          </Box>
        </div>
      </Animate>
    </DefaultLayout>
  );
};

type BoxProps = PropsWithChildren<{
  style?: HTMLAttributes<"div">["style"];
}>;

const Box = ({ children, style }: BoxProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",

      alignItems: "center",
      ...(style as any),
    }}
  >
    {children}
  </div>
);
export default TestSlide;
