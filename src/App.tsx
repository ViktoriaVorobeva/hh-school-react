import React, { useEffect, useState } from "react";
import "./App.css";
import Settings from "./components/settings/Settings";
import { getResultFromLocalStorage } from "./utils/localStorage";
import { ContextValue } from "./types";
import { useDispatch, useSelector } from "./services/hooks";
import { getUpdateFromLS } from "./services/actions";

export const SettingsContext = React.createContext<ContextValue | null>(null);

function App() {
  const settings = useSelector((store) => store.reviewerState)
  const [showSetting, setShowSetting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const settingsLS = getResultFromLocalStorage('settings');
    dispatch(getUpdateFromLS(settingsLS));
  }, [])
  
  return (
    <SettingsContext.Provider value={{ settings }}>
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
