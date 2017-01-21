
interface Response {

    help: string;
    success: true;
}

interface PackageResource {

    mimetype?: string;
    cache_url?: string;
    hash?: string;
    description?: string;
    name?: string;
    format?: string;
    url?: string;
    cache_last_updated?: string;
    package_id?: string;
    created?: string;
    state?: string;
    mimetype_inner?: string;
    webstore_last_updated?: string;
    last_modified?: string;
    position?: number;
    revision_id?: string;
    webstore_url?: string;
    url_type?: string;
    id?: string;
    resource_type?: string;
    size?: number;
}

interface PackageTag {

    vocabulary_id?: string;
    state?: string;
    display_name?: string;
    id?: string;
    name?: string;
}

interface PackageGroup {

    display_name: string;
    description: string;
    image_display_url: string;
    title: string;
    id: string;
    name: string;
}

interface PackageResult {

    license_title?: string;
    maintainer?: string;
    private?: boolean;
    maintainer_email?: string;
    num_tags?: number;
    update_frequency?: string;
    id?: string;
    metadata_created?: string;
    metadata_modified?: string;
    author?: string;
    author_email?: string;
    temporal?: string;
    state?: string;
    version?: string;
    license_id?: string;
    type?: string;
    resources?: PackageResource[];
    num_resources?: number;
    tags?: PackageTag[];
    language?: string;
    methodologie?: string;
    groups?: PackageGroup[];
    creator_user_id?: string;
    ext_spatial?: string;
    organization?: {
        description?: string;
        created?: string;
        title?: string;
        name?: string;
        is_organization?: boolean;
        state?: string;
        image_url?: string;
        revision_id?: string;
        type?: string;
        id?: string;
        approval_status?: string;
    };
    name?: string;
    isopen?: boolean;
    url?: string;
    notes?: string;
    owner_org?: string;
    territoire?: string[];
    license_url?: string;
    title?: string;
    revision_id?: string;
    
}

export interface PackageSearchResult extends Response {

    result?: {

        count?: number;
        sort?: string;
        results?: PackageResult[];
    };
}