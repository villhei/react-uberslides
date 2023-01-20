import React from "react";

export type LayoutProps = {
  backgroundColor?: string;
  className?: string;
  flex?: boolean;
  width?: string;
  height?: string;
} & React.HTMLProps<"div">;

export const DefaultLayout = (props: LayoutProps) => {
  const {
    className,
    flex,
    width = "100%",
    height = "100%",
    backgroundColor = "white",
    children,
    style = {},
  } = props;
  return (
    <div
      style={{
        display: flex ? "flex" : undefined,
        width,
        height,
        overflow: "hidden",
        backgroundColor,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
