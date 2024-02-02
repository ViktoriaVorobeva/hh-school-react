import { useSelector } from "../../services/hooks";

export const ReviewersList = () => {
  const { possibleReviewers } = useSelector((store) => store.reviewer);
  return (
    <div>
      <h2>All Reviewers:</h2>
      <ul>
        {possibleReviewers.map(({ login }) => (
          <li key={login}>{login}</li>
        ))}
      </ul>
    </div>
  );
};
