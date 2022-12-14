const MESSAGES = {
    DATA_FETCHED_SUCCESSFULLY: 'Data fetched successfully',
    NO_DATA_FOUND: 'No data found',
    ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID: 'One/more required request parameters is/are missing or invalid',
    PLAYLIST_NAME_ALREADY_EXISTS: 'Playlist name already exists',
    USER_WITH_EMAIL_ALREADY_EXISTS: 'User with email already exists',
    ONE_OR_MORE_IDS_ARE_INVALID: 'One/more track IDs are invalid',
    UNABLE_TO_SAVE_DATA: 'Unable to save data',
    DATA_CREATED_SUCCESSFULLY: 'Data created successfully',
    DATA_UPDATED_SUCCESSFULLY: 'Data updated successfully',
    PLAYLIST_NAME_DOES_NOT_EXIST: 'Playlist name does NOT exists',
    UNABLE_TO_UPDATE_DATA: 'Unable to update data',
    DATA_DELETED_SUCCESSFULLY: 'Data deleted successfully',
    PLAYLIST_DOES_NOT_EXIST: 'Playlist does NOT exists',
    INVALID_ID: 'Invalid ID',
    AUTHENTICATION_SUCCESSFUL: 'Authentication Successful',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_DOES_NOT_EXIST: 'User does not exist, kindly sign up',
    ATTEMPT_A_DIFFERENT_LOGIN_MECHANISM: 'Invalid credentials, attempt a different login mechanism',
    ACCOUNT_DEACTIVATED: 'Account deactivated, kindly contact admin',
    ACCESS_TOKEN_REQUIRED: 'Access token required',
    ONLY_ADMINS_ARE_ALLOWED: 'Only ADMINS are allowed to perform this action',
    UNAUTHORIZED_ONLY_PLAYLIST_CREATOR_CAN_PERFORM_THIS_ACTION: "Unauthorized ! Only playlist creator can perform this action",
    PLAYLIST_VISIBILITY_IS_NOT_PUBLIC: "Playlist visibility is not public",
    NOT_ALLOWED_TO_REVIEW_SELF_PLAYLIST: "Not allowed to review the playlist you created",
    NOT_AUTHORIZED_TO_PERFORM_ACTION: "You're not Authorized to carry out this action",
    INCORRECT_PASSWORD: "Incorrect Password"
}

const PLAYLIST_VISIBILITY = {
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC',
    ADMIN: 'ADMIN'
}

const BINARY_FLAG = {
    YES: 'Y',
    NO: 'N'
}

const USER_ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    DEACTIVATED: 'DEACTIVATED'
}

const USER_TYPE = {
    LOCAL: 'LOCAL',
    THIRD_PARTY: 'THIRD_PARTY'
}

module.exports = {MESSAGES, PLAYLIST_VISIBILITY, BINARY_FLAG, USER_ROLE, USER_STATUS, USER_TYPE};
