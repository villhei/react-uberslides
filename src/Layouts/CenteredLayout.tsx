import React from "react";
import { DefaultLayout, LayoutProps } from "./DefaultLayout";
import "./Layout.css";

export type CenteredLayoutProps = LayoutProps;

export const CenteredLayout = (props: CenteredLayoutProps) => {
  const { style = {}, className, ...rest } = props;

  return (
    <DefaultLayout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        ...style,
      }}
      className="react-uberslides-slideshow-layout-centered"
      {...rest}
    />
  );
};
