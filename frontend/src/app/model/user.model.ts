export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public role: string,
        public status: string,
        public emailVerifiedFlag: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        private type: string
    ) {
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
