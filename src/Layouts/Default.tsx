import React from "react";

export type LayoutProps = {
  backgroundColor?: string;
  width?: string;
  height?: string;
} & React.HTMLProps<"div">;

export const DefaultLayout = (props: LayoutProps) => {
  const {
    width = "100%",
    height = "100%",
    backgroundColor = "white",
    children,
    style = {},
  } = props;
  return (
    <div style={{ width, height, backgroundColor, ...style }}>{children}</div>
  );
};
