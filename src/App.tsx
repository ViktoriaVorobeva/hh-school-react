import React, { useEffect, useState } from "react";
import "./App.css";
import Settings from "./components/settings/Settings";
import { getResultFromLocalStorage, initialSettings } from "./utils/localStorage";
import { ContextValue, SettingsType } from "./types";

export const SettingsContext = React.createContext<ContextValue | null>(null);

function App() {
  const [showSetting, setShowSetting] = useState(false);
  const [settings, setSettings] = useState<SettingsType>(initialSettings);

  useEffect(() => {
    setSettings(getResultFromLocalStorage("settings"))
  }, [])
  
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {!showSetting && (
        <button type="button" onClick={() => setShowSetting(!showSetting)}>
          Click for see settings
        </button>
      )}
      {showSetting && <Settings />}
    </SettingsContext.Provider>
  );
}

export default App;
