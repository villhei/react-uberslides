import { Slideshow, SlideTransitionStyle, useToggle } from "react-slideshow";
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

import Monospace from "./slides/Monospace";

import "./style.css";
import { useState } from "react";

const slides = [Hello, Introduction, Features, Monospace, TestSlide];

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
          fontSize: "4em",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <Slideshow
          width={1920}
          height={1080}
          slides={slides}
          slideNumber={slideNumber}
          onRequestSlide={changeSlide}
          fullscreen={fullscreen}
          onExitFullscreen={() => setFullscreen(false)}
          transitionStyle={animationStyle}
        />
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
