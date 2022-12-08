import React from "react";
import { DefaultLayout, LayoutProps } from "./DefaultLayout";

export type CenteredLayoutProps = LayoutProps;

export const CenteredLayout = (props: CenteredLayoutProps) => {
  const { style = {}, ...rest } = props;

  return (
    <DefaultLayout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        ...style,
      }}
      {...rest}
    />
  );
};
