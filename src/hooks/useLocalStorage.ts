import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
  // eslint-disable-next-line no-unused-vars
): readonly [T, (value: T | ((val: T) => T)) => void] => {
  const { t } = useTranslation();

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      toast.error(t("ErrorLocalStorage"));
      return initialValue;
    }
  });
  // eslint-disable-next-line no-unused-vars
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      toast.error(t("ErrorLocalStorage"));
    }
  };
  return [storedValue, setValue] as const;
};
