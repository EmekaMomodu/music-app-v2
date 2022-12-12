import {environment} from "../../environments/environment";

/** urls */
export const URLS = {
    TRACKS: environment.BASE_URL.concat('/api/open/tracks'),
    OPEN_PLAYLISTS: environment.BASE_URL.concat('/api/open/playlists')
};

export const MAX_NO_OF_RECORDS = 50;
