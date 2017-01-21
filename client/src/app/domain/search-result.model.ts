export interface ResourceResult {
    description?: string;
    name?: string;
    format?: string;
    url?: string;
    id?: string;
    size?: number;
}

export interface SearchResult {
    id: string;
    license_title: string;
    resources: ResourceResult[];
    num_resources: number;
    methodologie: string;
    groups: string[];
    title: string;
    formats: string[];
}
