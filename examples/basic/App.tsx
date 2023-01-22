import {
  SlidePreview,
  Slideshow,
  SlideTransitionStyle,
  useToggle,
} from "react-slideshow";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import TestSlide from "./slides/TestSlide";
import Hello from "./slides/Hello";
import Introduction from "./slides/Introduction";
import Features from "./slides/Features";

import MadHackerPresentations from "./slides/MadHackerPresentations";

import "./style.css";
import { useState } from "react";

const slides = [
  Hello,
  Introduction,
  Features,
  MadHackerPresentations,
  TestSlide,
];

const SlideView = () => {
  const { slideID = "0" } = useParams();

  const navigate = useNavigate();

  const changeSlide = (slide: number) => {
    navigate(`/${slide}`);
  };

  const slideNumber = parseInt(slideID);
  const [animationStyle, setAnimationStyle] =
    useState<SlideTransitionStyle>("fade");

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
        <button
          onClick={(event) => {
            event.preventDefault();
            setAnimationStyle(animationStyle === "fade" ? "slide" : "fade");
          }}
        >
          {animationStyle === "fade"
            ? "Use slide animation"
            : "Use fade animation"}
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "black",
          padding: "0.5em 0em",
        }}
      >
        <Slideshow
          slides={slides}
          slideNumber={slideNumber}
          onRequestSlide={changeSlide}
          fullscreen={fullscreen}
          onExitFullscreen={() => setFullscreen(false)}
          transitionStyle={animationStyle}
        />
      </div>
      <div
        id="slides"
        style={{
          display: "flex",
          width: "100%",
          marginTop: "1em",
          overflow: "auto",
        }}
      >
        {slides.map((Slide, i) => (
          <div
            className="slide-preview"
            tabIndex={0}
            key={i}
            onClick={() => changeSlide(i)}
          >
            <SlidePreview slide={Slide} slideNumber={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};
const router = createHashRouter(
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
