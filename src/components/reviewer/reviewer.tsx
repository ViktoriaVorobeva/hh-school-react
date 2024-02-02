import { useSelector } from "../../services/hooks";
import styles from "./reviewer.module.css";

export const Reviewer = () => {
  const { reviewer } = useSelector((store) => store.reviewer);
  if (!reviewer) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2>Your reviewer:</h2>
      <p>{reviewer.login}</p>
      <a href={reviewer.url}>{reviewer.url}</a>
    </div>
  );
};
