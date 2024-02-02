import { useRef } from "react";
import styles from "./blacklist.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { addToBlackListAction, deleteFromBlackList } from "../../services/actions";

function BlackList() {
  const {blacklist} = useSelector((store) => store.reviewerState);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const resetFromBlackList = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    dispatch(deleteFromBlackList(value))
  };

  const addToBlackList = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentLogin = inputRef.current?.value;
    if (currentLogin && !blacklist.includes(currentLogin)) {
      dispatch(addToBlackListAction(currentLogin));
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
      {blacklist.length !== 0 && (
        <ul>
          {blacklist.map((email) => (
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
