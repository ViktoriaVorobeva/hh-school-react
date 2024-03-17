import { SettingsType } from "../types";

export const initialSettings: SettingsType = {
  owner: "",
  repo: "",
  blacklist: [],
};

const saveResultInLocalStorage = (key: string, data: SettingsType) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getResultFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value !== null) {
    try {
      return JSON.parse(value) as SettingsType;
    } catch {
      return initialSettings;
    }
  }
  return initialSettings;
};

export { saveResultInLocalStorage, getResultFromLocalStorage };
