type MaybeString = string | undefined | null;

const isString = (obj: unknown): obj is string => typeof obj === "string";

export const joinClassName = (
  first: MaybeString,
  second: MaybeString
): string | undefined => {
  const inputs = [first, second].filter(isString);

  return inputs.length > 0 ? inputs.join(" ") : undefined;
};
