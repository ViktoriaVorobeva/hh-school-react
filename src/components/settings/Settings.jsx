import { useContext, useState } from "react";
import BlackList from "../blacklist/BlackList";
import { inputHandler, request } from "../../utils/api";
import { SettingsContext } from "../../App";
import Reviewer from "../reviewer/reviewer";
import styles from "./settings.module.css";

const initialForm = {
  owner: "",
  repo: "",
};

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { blacklist } = settings;
  const [form, setValue] = useState(initialForm);
  const [reviewer, setReviewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [possible, setPossible] = useState([]);

  const onChange = (e) => {
    const target = e.target;
    setValue({ ...form, [target.name]: target.value });
  };

  const submitForm = async (e) => {
    setLoading(true);
    try {
      let currentReviewer;
      const data = await inputHandler(e, form, blacklist);
      if (data.length !== 0) {
        currentReviewer = data[0];
        setPossible(data[1]);
      } else {
        currentReviewer = "";
      }
      setLoading(false);
      setReviewer(currentReviewer);
      setSettings({ ...settings, ...form });
      setValue(initialForm);
      e.target.reset();
    } catch (error) {
      setLoading(false);
      setError(true);
      setReviewer(false);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitForm}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="owner"
            placeholder="add your login"
            onChange={onChange}
            required
          ></input>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="repo"
            placeholder="add your repo"
            onChange={onChange}
            required
          ></input>
        </label>
        <BlackList />
        <button type="submit">Find reviewer</button>
      </form>
      {!error &&
      !loading &&
      (typeof reviewer === "string" || typeof reviewer === "object") ? (
        typeof reviewer === "object" ? (
          <>
            <Reviewer login={reviewer.login} url={reviewer.url} />
            {possible.length !== 0 && (
              <>
              <p>All Reviewers:</p>
              <ul>
                {possible.map(({login}) => (
                  <li key={login}>{login}</li>
                ))}
              </ul>
              </>
            )}
          </>
        ) : (
          <p>Not found Reviewer</p>
        )
      ) : (
        ""
      )}
      {error && (
        <p className={styles.error}>
          Произошла ошибка! Обновите страницу/попробуйте отправить запрос позже
        </p>
      )}
      {loading && <p>loading...</p>}
    </>
  );
}

export default Settings;
