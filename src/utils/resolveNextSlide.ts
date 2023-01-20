import { SlideNavigationAction } from "./useSlideNavigation";

export function resolveNextSlide(
  slideCount: number,
  currentSlide: number,
  action: SlideNavigationAction
) {
  switch (action) {
    case SlideNavigationAction.NEXT_SLIDE: {
      if (currentSlide + 1 < slideCount) {
        return currentSlide + 1;
      }
      return 0;
    }
    case SlideNavigationAction.PREV_SLIDE: {
      if (currentSlide - 1 > -1) {
        return currentSlide - 1;
      }
      return slideCount - 1;
    }
  }
}
