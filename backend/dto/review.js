class Review {
    constructor(review) {
        this.id = review._id;
        this.comment = review.comment;
        this.creator = review.creator;
        this.createdAt = review.created_at;
        this.hiddenFlag = review.hidden_flag;
    }
}

module.exports = Review;
