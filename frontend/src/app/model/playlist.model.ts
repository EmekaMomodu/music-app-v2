import {Creator} from "./creator.model";
import {Track} from "./track.model";
import {Review} from "./review.model";

export interface Playlist {
    id?: string;
    name?: string;
    description?: string;
    numberOfTracks?: number;
    totalPlayTime?: string;
    visibility?: string;
    creator?: Creator;
    lastModifiedAt?: Date;
    averageRating?: number;
    tracks?: Track[];
    reviews?: Review[];
}
