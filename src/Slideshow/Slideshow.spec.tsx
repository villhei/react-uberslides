import { fireEvent, render } from "@testing-library/react"; // ES6
import { mockAnimationsApi } from "jsdom-testing-mocks";
import { Slideshow, SlideshowProps } from "./Slideshow";

const minimalProps: SlideshowProps = {
  slides: [],
  onRequestSlide: jest.fn(),
};

mockAnimationsApi();

afterEach(() => {
  jest.resetAllMocks();
});

it("should have Hello text if no slides are given", () => {
  const { getByText } = render(<Slideshow {...minimalProps} />);
  getByText("Hello!");
});

it("should be focusable", () => {
  const { getByRole } = render(<Slideshow {...minimalProps} />);
  const containerElement = getByRole("document");
  fireEvent.focus(containerElement);
});
