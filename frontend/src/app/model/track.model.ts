export interface Track {
    id?: number;
    albumId?: number;
    albumTitle?: string;
    artistId?: number;
    artistName?: string;
    tags?: any;
    dateCreated?: Date;
    dateRecorded?: Date;
    duration: string;
    genres: string[];
    number: number;
    title: string;
}
