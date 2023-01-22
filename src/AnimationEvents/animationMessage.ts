export type AnimationEvent = "started" | "canceled" | "finished";

export type AnimationMessage = { name: string; event: AnimationEvent };
export type AnimationMessageHandler = (msg: AnimationMessage) => void;
