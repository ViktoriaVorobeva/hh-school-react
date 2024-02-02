import { Form, ResponceOk } from "../types";
import { BASE_URL, BASE_URL_END } from "./constants";

export const request = (value: Form): Promise<Array<ResponceOk>> => {
  const { owner, repo } = value;
  return fetch(`${BASE_URL}${owner}/${repo}${BASE_URL_END}`).then(
    (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    }, 
  ).catch((reason) => Promise.reject(reason));
};

// export const inputHandler = async (
//   e: FormEvent,
//   form: Form,
//   blacklist: Array<string>
// ) => {
//   e.preventDefault();
//   let contributorsList: Array<ResponceOk> = [];
//   try {
//     contributorsList = await request(form);
//     saveResultInLocalStorage("settings", { ...form, blacklist });
//     const possibleReviewers = contributorsList.filter(
//       ({ login }) => !blacklist.includes(login)
//     );
//     const currentReviewer = getRandomReviewer(possibleReviewers);
//     return {currentReviewer, possibleReviewers };
//   } catch(e) {
//     Promise.reject(e);
//   }
// };

export const getRandomReviewer = (reviewers: Array<ResponceOk>) => {
  if (reviewers.length !== 0) {
    return reviewers[Math.floor(Math.random() * reviewers.length)];
  }
  return null;
};
