import React from "react";
import { MonospaceLayout } from "react-slideshow";

const Monospace: React.FC = () => (
  <MonospaceLayout style={{ fontFamily: "IBM Plex Mono, monospace" }}>
    <h1>ps aux</h1>
    {`PID TTY           TIME CMD
10977 ttys000    0:00.34 /bin/zsh -il
36342 ttys000    0:00.39 node /Users/ville/.yarn/bin/yarn.js start:dev
36366 ttys000    0:00.36 /Users/ville/.nvm/versions/node/v18.12.1/bin/node /Use
36380 ttys000    0:06.72 /Users/ville/.nvm/versions/node/v18.12.1/bin/node /Use
16479 ttys003    0:00.52 /bin/zsh -il
35390 ttys004    0:00.42 /bin/zsh -il
37521 ttys005    0:00.14 -zsh
      `}
  </MonospaceLayout>
);

export default Monospace;
