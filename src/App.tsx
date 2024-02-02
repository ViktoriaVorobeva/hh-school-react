import React, { useEffect, useState } from "react";
import "./App.css";
import Settings from "./components/settings/Settings";
import { getResultFromLocalStorage } from "./utils/localStorage";
import { useDispatch } from "./services/hooks";
import { getUpdateFromLS } from "./services/actions";

function App() {
  const [showSetting, setShowSetting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const settingsLS = getResultFromLocalStorage("settings");
    dispatch(getUpdateFromLS(settingsLS));
  }, []);

  return (
    <>
      {!showSetting && (
        <button type="button" onClick={() => setShowSetting(!showSetting)}>
          Click for see settings
        </button>
      )}
      {showSetting && <Settings />}
    </>
  );
}

export default App;
