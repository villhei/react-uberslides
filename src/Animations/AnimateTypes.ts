import { CSSProperties, ReactElement } from "react";
import { AnimationMessage } from "../AnimationContext";
import { ReactSlidesAnimation } from "./animations";
import { AnimationEventMap } from "../utils";

export type ValidChild = React.ReactElement<{ style: CSSProperties }> | string;

export type AnimateProps = {
  children?:
    | ValidChild
    | Array<ValidChild>
    | ReactElement<{ style: CSSProperties }>;
  animation?: ReactSlidesAnimation;
  animationConfig?: KeyframeAnimationOptions;
  delay?: number;
  duration?: number;
  name?: string;
  disabled?: boolean;
  startOn?: AnimationMessage;
  events?: AnimationEventMap;
};
