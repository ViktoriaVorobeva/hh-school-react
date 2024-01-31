import {
    BASE_URL,
    BASE_URL_END
} from "./constants";
import {
    saveResultInLocalStorage
} from "./localStorage";

export const request = (value) => {
    const {owner, repo} = value;
    return fetch(`${BASE_URL}${owner}/${repo}${BASE_URL_END}`).then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    });
};

export const inputHandler = async (e, form, blacklist) => {
    e.preventDefault();
    let contributorsList = [];
    try {
        contributorsList = await request(form);
        saveResultInLocalStorage('settings', {...form, blacklist});
        const currentReviewer = getRandomReviewer(blacklist, contributorsList);
        if (currentReviewer) {
            return [currentReviewer, contributorsList];
        } else {
            return [];
        }
    } catch (e) {
        throw e;
    }
};

export const getRandomReviewer = (blacklist, reviewers) => {
    const possibleReviewers = reviewers.filter(({login}) => !blacklist.includes(login));
    console.log(possibleReviewers)
    if (possibleReviewers.length !== 0) {
        return possibleReviewers[Math.floor(Math.random() * possibleReviewers.length)];
    } 
    return null;
}