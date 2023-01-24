import { joinClassName } from "../utils";
import { DefaultLayout, LayoutProps } from "./DefaultLayout";
import "./Layout.css";

export type CenteredLayoutProps = LayoutProps;

export const CenteredLayout = (props: CenteredLayoutProps) => {
  const { style = {}, className, ...rest } = props;

  return (
    <DefaultLayout
      style={{
        ...style,
      }}
      className={joinClassName("react-uberslides-layout-centered", className)}
      {...rest}
    />
  );
};
