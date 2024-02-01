import { ChangeEvent, FormEvent, useContext, useState } from "react";
import BlackList from "../blacklist/BlackList";
import { inputHandler } from "../../utils/api";
import { SettingsContext } from "../../App";
import { Reviewer } from "../reviewer/reviewer";
import styles from "./settings.module.css";
import { Form, Responce } from "../../types";
import { User } from "../user/user";

const initialForm: Form = {
  owner: "",
  repo: "",
};

function Settings() {
  const context = useContext(SettingsContext);

  if (!context) {
    return null;
  }

  const { settings, setSettings } = context;
  const { blacklist } = settings;
  const [form, setValue] = useState(initialForm);
  const [reviewer, setReviewer] = useState<boolean | string | Responce>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [possible, setPossible] = useState<Responce[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue({ ...form, [target.name]: target.value });
  };

  const submitForm = async (e: FormEvent) => {
    setLoading(true);
    try {
      let currentReviewer;
      const data = await inputHandler(e, form, blacklist);
      if (data.length !== 0) {
        const [currReviewer, allReviewers] = data;
        currentReviewer = currReviewer;
        setPossible(allReviewers as Responce[]);
      } else {
        currentReviewer = "";
      }
      setLoading(false);
      setReviewer(currentReviewer as Responce);
      setSettings({ ...settings, ...form });
      //@ts-ignore
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
          <div className={styles.container}>
            <User owner={form.owner} repo={form.repo} />
            <Reviewer login={reviewer.login} url={reviewer.url} />
            {possible.length !== 0 && (
              <div>
                <h2>All Reviewers:</h2>
                <ul>
                  {possible.map(({ login }) => (
                    <li key={login}>{login}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.container}>
            <User owner={form.owner} repo={form.repo} />
            <p>Not found Reviewer</p>
          </div>
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
