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
import "./style.css";

const slides = [Hello, World, TestSlide];

const SlideView = () => {
  const { slideID = "0" } = useParams();

  const navigate = useNavigate();

  const changeSlide = (slide: number) => {
    navigate(`/${slide}`);
  };

  const slideNumber = parseInt(slideID);

  const [fullscreen, toggleFullScreen, setFullscreen] = useToggle();

  return (
    <div style={{ overflow: "hidden" }}>
      <button
        onClick={(event) => {
          event.preventDefault();
          toggleFullScreen();
        }}
      >
        Toggle fullscreen
      </button>
      <Slideshow
        width={1920}
        height={1080}
        slides={slides}
        slideNumber={slideNumber}
        onRequestSlide={changeSlide}
        fullScreen={fullscreen}
        onExitFullScreen={() => setFullscreen(false)}
      />
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