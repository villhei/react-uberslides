export type ValidChild = React.ReactElement | string;
export type AnimateProps = {
  children?: ValidChild | Array<ValidChild> | Element;
  animation?: Array<Keyframe>;
  animationConfig?: KeyframeAnimationOptions;
  delay?: number;
};
