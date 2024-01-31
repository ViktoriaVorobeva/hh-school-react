export interface Settings {
    owner: string;
    repo: string;
    blacklist: Array<string>;
}

export interface Form {
    owner: string;
    repo: string;
}

export interface ContextValue {
    settings: Settings;
    setSettings:  React.Dispatch<React.SetStateAction<Settings>>
}

export interface Responce {
    login: string,
    url: string
}

export type ReviewerProps = {
    login: string
    url: string
}