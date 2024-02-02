import { ChangeEvent, FormEvent, useState } from "react";
import BlackList from "../blacklist/BlackList";
import { Reviewer } from "../reviewer/reviewer";
import styles from "./settings.module.css";
import { User } from "../user/user";
import { useDispatch, useSelector } from "../../services/hooks";
import { getReviewer } from "../../services/actions";

function Settings() {
  const {
    blacklist,
    owner,
    repo,
    isLoading,
    errors,
    reviewer,
    possibleReviewers,
  } = useSelector((store) => store.reviewerState);
  const [form, setValue] = useState({ owner, repo });
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue({ ...form, [target.name]: target.value });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(getReviewer(form, blacklist));
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitForm}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="owner"
            value={form.owner}
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
            value={form.repo}
            placeholder="add your repo"
            onChange={onChange}
            required
          ></input>
        </label>
        <BlackList />
        <button type="submit">Find reviewer</button>
      </form>
      {!errors &&
      !isLoading &&
      (typeof reviewer === "string" || typeof reviewer === "object") ? (
        typeof reviewer === "object" &&  reviewer !== null ? (
          <div className={styles.container}>
            <User owner={form.owner} repo={form.repo} />
            <Reviewer login={reviewer.login} url={reviewer.url} />
            {possibleReviewers.length !== 0 && (
              <div>
                <h2>All Reviewers:</h2>
                <ul>
                  {possibleReviewers.map(({ login }) => (
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
      {errors && (
        <p className={styles.error}>
          Произошла ошибка! Обновите страницу/попробуйте отправить запрос позже
        </p>
      )}
      {isLoading && <p>loading...</p>}
    </>
  );
}

export default Settings;
