const MESSAGES = {
    DATA_FETCHED_SUCCESSFULLY: 'Data fetched successfully',
    NO_DATA_FOUND: 'No data found',
    ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID: 'One/more required request parameters is/are missing or invalid',
    PLAYLIST_NAME_ALREADY_EXISTS: 'Playlist name already exists',
    ONE_OR_MORE_IDS_ARE_INVALID: 'One/more IDs are invalid',
    UNABLE_TO_SAVE_DATA: 'Unable to save data',
    DATA_CREATED_SUCCESSFULLY: 'Data created successfully',
    DATA_UPDATED_SUCCESSFULLY: 'Data updated successfully',
    PLAYLIST_NAME_DOES_NOT_EXIST: 'Playlist name does NOT exists',
    UNABLE_TO_UPDATE_DATA: 'Unable to update data',
    DATA_DELETED_SUCCESSFULLY: 'Data deleted successfully',
    PLAYLIST_DOES_NOT_EXIST: 'Playlist does NOT exists',
    INVALID_ID: 'Invalid ID'
}

const PLAYLIST_VISIBILITY = {
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC'
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
