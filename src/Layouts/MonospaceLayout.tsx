import { DefaultLayout, LayoutProps } from "./DefaultLayout";

export type MonospaceLayoutProps = LayoutProps;

export const MonospaceLayout = (props: MonospaceLayoutProps) => {
  const { style = {}, ...rest } = props;

  return (
    <DefaultLayout
      style={{
        boxSizing: "border-box",
        fontSize: "2.44rem",
        display: "flex",
        padding: "2rem",
        backgroundColor: "black",
        color: "lightgray",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        flexDirection: "column",
        ...style,
      }}
      {...rest}
    />
  );
};
