import {environment} from "../../environments/environment";

/** urls */
export const URLS = {
    AUTH: environment.BASE_URL.concat('/api/open/auth'),
    TRACKS: environment.BASE_URL.concat('/api/open/tracks'),
    OPEN_PLAYLISTS: environment.BASE_URL.concat('/api/open/playlists'),
    ADMIN_PLAYLISTS: environment.BASE_URL.concat('/api/admin/playlists'),
    ADMIN_PLAYLISTS_REVIEWS: environment.BASE_URL.concat('/api/admin/playlists/reviews'),
    SECURE_PLAYLISTS_REVIEWS: environment.BASE_URL.concat('/api/secure/playlists/reviews'),
    SECURE_PLAYLISTS: environment.BASE_URL.concat('/api/secure/playlists'),
    ADMIN_USERS: environment.BASE_URL.concat('/api/admin/users'),
    SECURE_USERS: environment.BASE_URL.concat('/api/secure/users'),
    OPEN_USERS: environment.BASE_URL.concat('/api/open/users'),
    SECURE_USERS_EMAIL: environment.BASE_URL.concat('/api/secure/users/email'),

    ADMIN_POLICY_SECURITY: environment.BASE_URL.concat('/api/admin/security'),
    ADMIN_POLICY_AUP: environment.BASE_URL.concat('/api/admin/aup'),
    ADMIN_POLICY_DMCA: environment.BASE_URL.concat('/api/admin/dmca'),

};

export const MAX_NO_OF_RECORDS = 50;

// 23 hours
export const TOKEN_VALIDITY_PERIOD_IN_SECONDS = 82800;
