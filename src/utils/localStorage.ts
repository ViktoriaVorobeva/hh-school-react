import { Settings } from "../types";

const initialSettings: Settings = {
    owner: "",
    repo: "",
    blacklist: [],
  };

const saveResultInLocalStorage = (key: string, data: Settings) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        localStorage.clear()
        localStorage.setItem(key, JSON.stringify(data));
    }
}

const getResultFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
        try {
            return JSON.parse(value) as Settings;
        } catch {
            return initialSettings;
        }
    }
    return initialSettings;
}

export {
    saveResultInLocalStorage,
    getResultFromLocalStorage
}