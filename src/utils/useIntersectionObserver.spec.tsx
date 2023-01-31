import { act, render, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const observerMap = new Map();
const instanceMap = new Map();

beforeEach(() => {
  // @ts-ignore
  global.IntersectionObserver = jest.fn((cb, options = {}) => {
    const instance = {
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold],
      root: options.root,
      rootMargin: options.rootMargin,
      observe: jest.fn((element: Element) => {
        instanceMap.set(element, instance);
        observerMap.set(element, cb);
      }),
      unobserve: jest.fn((element: Element) => {
        instanceMap.delete(element);
        observerMap.delete(element);
      }),
      disconnect: jest.fn(),
    };
    return instance;
  });
});

afterEach(() => {
  // @ts-ignore
  global.IntersectionObserver.mockReset();
  instanceMap.clear();
  observerMap.clear();
});

export function intersect(element: Element, isIntersecting: boolean) {
  const cb = observerMap.get(element);
  if (cb) {
    cb([
      {
        isIntersecting,
        target: element,
        intersectionRatio: isIntersecting ? 1 : -1,
      },
    ]);
  }
}

export function getObserverOf(element: Element): IntersectionObserver {
  return instanceMap.get(element);
}

it("should return a falsy flag and a ref", () => {
  const { result } = renderHook(() => useIntersectionObserver());

  expect(result.current).toEqual({
    hasIntersected: false,
    ref: {
      current: null,
    },
  });
});

it("should return a usable ref", () => {
  const { result } = renderHook(() =>
    useIntersectionObserver<HTMLDivElement>()
  );

  const Container = () => <div ref={result.current.ref} />;

  const { container } = render(<Container />);

  expect(result.current).toEqual({
    hasIntersected: false,
    ref: { current: container.firstChild },
  });
});

it("should register an observer", () => {
  const Container = () => {
    const { ref } = useIntersectionObserver<HTMLDivElement>();
    return <div data-testid="container" ref={ref} />;
  };

  const { getByTestId } = render(<Container />);

  const containerDiv = getByTestId("container");
  const instance = getObserverOf(containerDiv);

  expect(instance.observe).toHaveBeenCalledWith(containerDiv);
});

it("should not return true unless element is being intersected", () => {
  const Container = (props: {
    cb: (res: ReturnType<typeof useIntersectionObserver>) => void;
  }) => {
    const result = useIntersectionObserver<HTMLDivElement>();

    useEffect(() => {
      props.cb(result);
    }, [result]);
    return <div data-testid="container" ref={result.ref} />;
  };

  const callback = jest.fn();

  const { getByTestId } = render(<Container cb={callback} />);

  const containerDiv = getByTestId("container");
  intersect(containerDiv, false);

  expect(callback).not.toBeCalledWith({
    ref: expect.any(Object),
    hasIntersected: true,
  });
});

it("should return true if element is being intersected", () => {
  const Container = (props: {
    cb: (res: ReturnType<typeof useIntersectionObserver>) => void;
  }) => {
    const result = useIntersectionObserver<HTMLDivElement>();

    useEffect(() => {
      props.cb(result);
    }, [result]);
    return <div data-testid="container" ref={result.ref} />;
  };

  const callback = jest.fn();

  const { getByTestId } = render(<Container cb={callback} />);

  const containerDiv = getByTestId("container");
  act(() => {
    intersect(containerDiv, true);
  });

  expect(callback).toBeCalledWith({
    ref: { current: containerDiv },
    hasIntersected: true,
  });
});

it("should remove observer on unmount", () => {
  const Container = () => {
    const { ref } = useIntersectionObserver<HTMLDivElement>();
    return <div data-testid="container" ref={ref} />;
  };

  const { getByTestId, unmount } = render(<Container />);
  const containerDiv = getByTestId("container");

  unmount();

  expect(getObserverOf(containerDiv).disconnect).toHaveBeenCalled();
});
