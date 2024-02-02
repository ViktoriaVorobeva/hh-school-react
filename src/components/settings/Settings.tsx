import { ChangeEvent, FormEvent, useState } from "react";
import BlackList from "../blacklist/BlackList";
import { Reviewer } from "../reviewer/reviewer";
import styles from "./settings.module.css";
import { User } from "../user/user";
import { useDispatch, useSelector } from "../../services/hooks";
import { getReviewer, getUpdateFromState } from "../../services/actions";
import { ReviewersList } from "../reviewersList/reviewersList";

function Settings() {
  const { isLoading, isError, possibleReviewers } = useSelector(
    (store) => store.reviewer
  );
  const { blacklist, owner, repo } = useSelector((store) => store.settings);
  const [form, setValue] = useState({ owner, repo });
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue({ ...form, [target.name]: target.value });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(getUpdateFromState(form));
    dispatch(getReviewer());
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
      {!isError && !isLoading && (
        <div className={styles.container}>
          {owner && repo && <User owner={form.owner} repo={form.repo} />}
          <Reviewer />
          {possibleReviewers.length !== 0 ? (
            <ReviewersList />
          ) : (
            <p>Not found Reviewer</p>
          )}
        </div>
      )}
      {isError && (
        <p className={styles.error}>
          Произошла ошибка! Обновите страницу/попробуйте отправить запрос позже
        </p>
      )}
      {isLoading && <p>loading...</p>}
    </>
  );
}

export default Settings;
