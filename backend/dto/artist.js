class Artist {
    constructor(id,
                name,
                location,
                handle,
                contact,
                associatedLabels,
                activeYearBegin) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.handle = handle;
        this.contact = contact;
        this.associatedLabels = associatedLabels;
        this.activeYearBegin = activeYearBegin;
    }
}

module.exports = Artist;