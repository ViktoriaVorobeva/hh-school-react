import React, { useState } from "react";
import "./App.css";
import Settings from "./components/settings/Settings";
import { getResultFromLocalStorage } from "./utils/localStorage";
import { ContextValue } from "./types";

export const SettingsContext = React.createContext<ContextValue | null>(null);

function App() {
  const [showSetting, setShowSetting] = useState(false);
  const [settings, setSettings] = useState(getResultFromLocalStorage("settings"));
  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      {!showSetting && <button type="button" onClick={() => setShowSetting(!showSetting)}>
        Click for see settings
      </button>}
      {showSetting && <Settings />}
    </SettingsContext.Provider>
  );
}

export default App;
