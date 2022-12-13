class User {
    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.role = user.role;
        this.status = user.status;
    }
}

module.exports = User;