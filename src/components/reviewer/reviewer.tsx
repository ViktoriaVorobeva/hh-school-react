import { ReviewerProps } from "../../types";

export const Reviewer: React.FC<ReviewerProps> = ({ login, url }) => {
  return (
    <>
      <p>Your reviewer: </p>
      <p>{login}</p>
      <a href={url}>{url}</a>
    </>
  );
}
