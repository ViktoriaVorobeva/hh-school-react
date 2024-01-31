import { useContext, useRef } from "react";
import { saveResultInLocalStorage } from "../../utils/localStorage";
import { SettingsContext } from "../../App";
import styles from "./blacklist.module.css";

function BlackList() {
  const context = useContext(SettingsContext);

  if (!context) {
    return null;
  }

  const { settings, setSettings } = context;
  const inputRef = useRef<HTMLInputElement>(null);

  const resetFromBlackList = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    const blacklist = settings.blacklist.filter((email) => email !== value);
    saveResultInLocalStorage("settings", { ...settings, blacklist });
    setSettings({ ...settings, blacklist });
  };

  const addToBlackList = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentLogin = inputRef.current?.value;
    if (currentLogin && !settings.blacklist.includes(currentLogin)) {
      settings.blacklist.push(currentLogin);
      saveResultInLocalStorage("settings", settings);
      setSettings(settings);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className={styles.input__container}>
        <label className={styles.label}>
          <input
            className={styles.input}
            ref={inputRef}
            type="text"
            name="blacklist"
            placeholder="add to blacklist"
          ></input>
        </label>
        <button
          className={styles.button}
          type="button"
          onClick={addToBlackList}
        >
          Add to blacklist
        </button>
      </div>
      {settings.blacklist.length !== 0 && (
        <ul>
          {settings.blacklist.map((email) => (
            <li key={email}>
              {email}
              <button
                className={styles.button__delete}
                type="button"
                onClick={(e) => resetFromBlackList(e, email)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default BlackList;
