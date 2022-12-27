import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  console.log({useState})

  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => {
    setValue(!value);
  }, [value, setValue]);

  return [value, toggleValue, setValue] as const;
};
