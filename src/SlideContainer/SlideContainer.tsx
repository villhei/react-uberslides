import React from "react";

export type SlideProps = React.PropsWithChildren<{
  backgroundColor?: string;
  width: string;
  height: string;
}>;

const InnerSlideComponent = (
  props: SlideProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const { children, width, height } = props;

  return (
    <div
      style={{
        display: "flex",
        width,
        height,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export const SlideContainer = React.forwardRef<HTMLDivElement, SlideProps>(
  InnerSlideComponent
);
