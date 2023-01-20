import React from "react";
import { AnimateSequence, MonospaceLayout, timings } from "react-slideshow";

const Monospace: React.FC = () => (
  <MonospaceLayout
    style={{
      fontFamily: "IBM Plex Mono, monospace",
      padding: "3em",
    }}
  >
    <h1 style={{ color: "white" }}>Mad hacker presentations</h1>
    <AnimateSequence delay={timings.fastest}>
      {`PID TTY           TIME CMD
10977 ttys000    0:00.34 /bin/zsh -il
36342 ttys000    0:00.39 node /Users/ville/.yarn/bin/yarn.js start:dev
36366 ttys000    0:00.36 node /Use
36380 ttys000    0:06.72 node /Use
16479 ttys003    0:00.52 /bin/zsh -il
35390 ttys004    0:00.42 /bin/zsh -il
37521 ttys005    0:00.14 -zsh
      `
        .split("\n")
        .map((str, i) => (
          <span style={{ opacity: 0 }} key={i}>
            {str}
          </span>
        ))}
    </AnimateSequence>
  </MonospaceLayout>
);

export default Monospace;
