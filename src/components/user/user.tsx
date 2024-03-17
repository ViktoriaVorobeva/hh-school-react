import { Form } from "../../types";

export const User: React.FC<Form> = ({ owner, repo }) => {
  return (
    <div>
      <h2>For</h2>
      <p>user: {owner}</p>
      <p> repo: {repo}</p>
    </div>
  );
};
