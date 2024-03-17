export interface SettingsType {
    owner: string;
    repo: string;
    blacklist: Array<string>;
}

export interface Form {
    owner: string;
    repo: string;
}

export type User = {
    login: string
    url: string
}