import {environment} from "../../environments/environment";

/** urls */
export const URLS = {
    AUTH: environment.BASE_URL.concat('/api/open/auth'),
    TRACKS: environment.BASE_URL.concat('/api/open/tracks'),
    OPEN_PLAYLISTS: environment.BASE_URL.concat('/api/open/playlists'),
    ADMIN_PLAYLISTS: environment.BASE_URL.concat('/api/admin/playlists'),
    ADMIN_PLAYLISTS_REVIEWS: environment.BASE_URL.concat('/api/admin/playlists/reviews')
};

export const MAX_NO_OF_RECORDS = 50;

// 23 hours
export const TOKEN_VALIDITY_PERIOD_IN_SECONDS = 82800;
