import { act, fireEvent, renderHook } from "@testing-library/react";
import { useSlideNavigation } from "./useSlideNavigation";

const mockDiv = document.createElement("div");

it("should call eventHandler on arrow right", () => {
  const handler = jest.fn();
  const ref = { current: mockDiv };
  renderHook(() => useSlideNavigation(ref, false, handler));

  act(() => {
    fireEvent.keyUp(mockDiv);
    jest.runAllTimers();
  });

  expect(handler).toHaveBeenCalled();
});
