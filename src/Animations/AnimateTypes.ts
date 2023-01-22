import { CSSProperties, ReactElement } from "react";
import { AnimationMessage } from "../AnimationEvents";
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
  name?: string;
  disabled?: boolean;
  startOn?: AnimationMessage;
  events?: AnimationEventMap;
};
