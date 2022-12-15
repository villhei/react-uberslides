import { Slideshow, useToggle } from "react-slideshow";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import TestSlide from "./slides/TestSlide";
import Hello from "./slides/Hello";
import World from "./slides/World";
import Monospace from "./slides/Monospace";

import "./style.css";

const slides = [Hello, World, Monospace, TestSlide];

const SlideView = () => {
  const { slideID = "0" } = useParams();

  const navigate = useNavigate();

  const changeSlide = (slide: number) => {
    navigate(`/${slide}`);
  };

  const slideNumber = parseInt(slideID);

  const [fullscreen, toggleFullScreen, setFullscreen] = useToggle();

  return (
    <div
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleFullScreen();
          }}
        >
          Toggle fullscreen
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          border: "2px solid black",
          backgroundColor: "black",
        }}
      >
        <Slideshow
          width={1920}
          height={1080}
          slides={[]}
          slideNumber={slideNumber}
          onRequestSlide={changeSlide}
          fullscreen={fullscreen}
          onExitFullscreen={() => setFullscreen(false)}
        />
      </div>
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SlideView />}>
      <Route path="/:slideID" element={<SlideView />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
