export interface Playlist {
    id?: string;
    name?: string;
    description?: string;
    numberOfTracks?: number;
    totalPlayTime?: string;
    visibility?: string;
    creator?: {
        id?: string;
        email?: string;
        name?: string
    };
    lastModifiedAt?: Date;
}
