const models = {
    user: {
        name: String,
        createdDate: Date,
        modifiedDate: Date,
        notes: [Array('note'), 'user'],
        collections: [Array('collection'), 'user'],
        tags: [Array('tag'), 'user']
    },
    note: {
        content: String,
        createdDate: Date,
        modifiedDate: Date,
        user: ['user', 'notes'],
        tags: [Array('tag'), 'notes']
    },
    collection: {
        createdDate: Date,
        modifiedDate: Date,
        user: ['user', 'collections'],
        tags: [Array('tag'), 'collections']
    },
    tag: {
        content: String,
        createdDate: Date,
        modifiedDate: Date,
        user: ['user', 'tags'],
        notes: [Array('note'), 'tags'],
        collections: [Array('collection'), 'tags']
    }
};

export default models;
