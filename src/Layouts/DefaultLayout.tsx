import React from "react";
import { joinClassName } from "../utils/joinClassName";

export type LayoutProps = {
  backgroundColor?: string;
  className?: string;
  flex?: boolean;
  width?: string;
  height?: string;
} & React.HTMLProps<"div">;

export const DefaultLayout = (props: LayoutProps) => {
  const { className, children, style = {} } = props;
  return (
    <div
      style={{
        ...style,
      }}
      className={joinClassName("react-uberslides-layout-default", className)}
    >
      {children}
    </div>
  );
};
