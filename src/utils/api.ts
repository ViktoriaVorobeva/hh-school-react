import { FormEvent } from "react";
import { Form, Responce } from "../types";
import {
    BASE_URL,
    BASE_URL_END
} from "./constants";
import {
    saveResultInLocalStorage
} from "./localStorage";

export const request = (value: Form): Promise<Array<Responce>> => {
    const {owner, repo} = value;
    return fetch(`${BASE_URL}${owner}/${repo}${BASE_URL_END}`).then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    });
};

export const inputHandler = async (e: FormEvent, form: Form, blacklist: Array<string>) => {
    e.preventDefault();
    let contributorsList: Array<Responce> = [];
    try {
        contributorsList = await request(form);
        saveResultInLocalStorage('settings', {...form, blacklist});
        const possibleReviewers = contributorsList.filter(({login}) => !blacklist.includes(login));
        const currentReviewer = getRandomReviewer(possibleReviewers);
        if (currentReviewer) {
            return [currentReviewer, possibleReviewers];
        } else {
            return [];
        }
    } catch (e) {
        throw e;
    }
};

export const getRandomReviewer = (reviewers: Array<Responce>) => {
    if (reviewers.length !== 0) {
        return reviewers[Math.floor(Math.random() * reviewers.length)];
    } 
    return null;
}