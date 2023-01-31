import { act, render, renderHook } from "@testing-library/react";
import { createRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useAnimation, UseAnimationOptions } from "./useAnimation";

const useIntersectionObserverMock =
  useIntersectionObserver as jest.MockedFunction<
    typeof useIntersectionObserver
  >;

jest.mock("./useIntersectionObserver");

useIntersectionObserverMock.mockImplementation(() => ({
  hasIntersected: false,
  ref: createRef(),
}));

const keyframes: Keyframe[] = [
  {
    opacity: 0,
  },
  {
    opacity: 1,
  },
];

const animationConfig = {};

const animationOptions: UseAnimationOptions = {
  events: {
    started: true,
    canceled: true,
    finished: true,
  },
};

it("should return initial ref and a falsy completion flag", () => {
  const { result } = renderHook(() =>
    useAnimation(keyframes, animationConfig, animationOptions)
  );

  expect(result.current).toEqual({ completed: false, ref: { current: null } });
});

it("should return a usable ref", () => {
  const { result } = renderHook(() =>
    useAnimation<HTMLDivElement>(keyframes, animationConfig, animationOptions)
  );

  const Container = () => <div ref={result.current.ref} />;

  const { container } = render(<Container />);

  expect(result.current).toEqual({
    completed: false,
    ref: { current: container.firstChild },
  });
});
