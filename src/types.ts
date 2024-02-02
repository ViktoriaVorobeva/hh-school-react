export interface SettingsType {
    owner: string;
    repo: string;
    blacklist: Array<string>;
}

export interface Form {
    owner: string;
    repo: string;
}

export interface ContextValue {
    settings: SettingsType;
}

export interface ResponceOk {
    login: string,
    url: string
}

export type ReviewerProps = {
    login: string
    url: string
}