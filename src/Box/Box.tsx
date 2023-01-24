export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren<{
    flex?: boolean;
  }>;

export const Box: React.FC<BoxProps> = ({ flex, style, ...rest }) => (
  <div style={{ display: flex ? "flex" : undefined, ...style }} {...rest} />
);
