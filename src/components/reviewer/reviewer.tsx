import { ReviewerProps } from "../../types";
import styles from "./reviewer.module.css";

export const Reviewer: React.FC<ReviewerProps> = ({ login, url }) => {
  return (
    <div className={styles.container}>
      <h2>Your reviewer:</h2>
      <p>{login}</p>
      <a href={url}>{url}</a>
    </div>
  );
};
