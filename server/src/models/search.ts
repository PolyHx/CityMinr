
export interface RessourceResult {
    description?: string;
    name?: string;
    format?: string;
    url?: string;
    id?: string;
}

export interface SearchResult {
    id: string;
    license_title?: string;
    resources?: RessourceResult[];
    methodologie?: string;
    groups?: string[];
    title?: string;
}