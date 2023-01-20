import { resolveNextSlide } from "./resolveNextSlide";
import { SlideNavigationAction } from "./useSlideNavigation";

const slideCount = 3;

it("should move up from initial slide with NEXT_SLIDE", () => {
  expect(
    resolveNextSlide(slideCount, 0, SlideNavigationAction.NEXT_SLIDE)
  ).toEqual(1);
});

it("should loop back to last slide PREV_SLIDE", () => {
  expect(
    resolveNextSlide(slideCount, 0, SlideNavigationAction.PREV_SLIDE)
  ).toEqual(2);
});

it("should loop back from last with NEXT_SLIDE", () => {
  expect(
    resolveNextSlide(slideCount, 2, SlideNavigationAction.NEXT_SLIDE)
  ).toEqual(0);
});

it("should move back with PREV_SLIDE", () => {
  expect(
    resolveNextSlide(slideCount, 1, SlideNavigationAction.PREV_SLIDE)
  ).toEqual(0);
});
