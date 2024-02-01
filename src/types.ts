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
    setSettings:  React.Dispatch<React.SetStateAction<SettingsType>>
}

export interface Responce {
    login: string,
    url: string
}

export type ReviewerProps = {
    login: string
    url: string
}