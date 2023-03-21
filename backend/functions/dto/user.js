class User {
    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.role = user.role;
        this.status = user.status;
        this.emailVerifiedFlag = user.email_verified_flag;
        this.type = user.type;
    }
}

module.exports = User;
