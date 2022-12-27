import { act, fireEvent, renderHook } from "@testing-library/react";
import { SlideAction, useSlideNavigation } from "./useSlideNavigation";

const mockDiv = document.createElement("div");

beforeAll(() => {
  jest.useFakeTimers();
});

function createScreenXY(x: number, y: number) {
  return { screenX: x, screenY: y };
}

export function createTouchEvent({ x = 0, y = 0 }) {
  return { changedTouches: [createScreenXY(x, y)] };
}

it("should call event handler with PREV_SLIDE on arrow left", () => {
  const handler = jest.fn();
  const ref = { current: mockDiv };
  renderHook(() => useSlideNavigation(ref, false, handler));

  fireEvent.keyUp(mockDiv, {
    key: "ArrowLeft",
  });

  expect(handler).toHaveBeenCalledWith(SlideAction.PREV_SLIDE);
});

it("should call event handler with NEXT_SLIDE on arrow right", () => {
  const handler = jest.fn();
  const ref = { current: mockDiv };
  renderHook(() => useSlideNavigation(ref, false, handler));

  fireEvent.keyUp(mockDiv, {
    key: "ArrowRight",
  });

  expect(handler).toHaveBeenCalledWith(SlideAction.NEXT_SLIDE);
});

it("should call event handler with NEXT_SLIDE on swipe left", () => {
  const handler = jest.fn();
  const ref = { current: mockDiv };
  renderHook(() => useSlideNavigation(ref, false, handler));

  act(() => {
    fireEvent.touchStart(
      mockDiv,
      createTouchEvent({
        x: 100,
      })
    );
    fireEvent.touchEnd(
      mockDiv,
      createTouchEvent({
        x: 0,
      })
    );
  });
  expect(handler).toHaveBeenCalledWith(SlideAction.NEXT_SLIDE);
});

it("should call event handler with PREV_SLIDE on swipe right", () => {
  const handler = jest.fn();
  const ref = { current: mockDiv };
  renderHook(() => useSlideNavigation(ref, false, handler));

  act(() => {
    fireEvent.touchStart(
      mockDiv,
      createTouchEvent({
        x: 0,
      })
    );
    fireEvent.touchEnd(
      mockDiv,
      createTouchEvent({
        x: 100,
      })
    );
  });
  expect(handler).toHaveBeenCalledWith(SlideAction.PREV_SLIDE);
});
