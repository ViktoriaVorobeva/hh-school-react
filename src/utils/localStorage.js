const initialSettings = {
    owner: "",
    repo: "",
    blacklist: [],
  };

const saveResultInLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        localStorage.clear()
        localStorage.setItem(key, JSON.stringify(data));
    }
}

const getResultFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
        try {
            return JSON.parse(value);
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