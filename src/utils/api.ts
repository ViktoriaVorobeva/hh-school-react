import { Form, User } from "../types";
import { BASE_URL, BASE_URL_END } from "./constants";

export const request = (value: Form): Promise<Array<User>> => {
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

export const getRandomReviewer = (reviewers: Array<User>) => {
  if (reviewers.length !== 0) {
    return reviewers[Math.floor(Math.random() * reviewers.length)];
  }
  return null;
};
