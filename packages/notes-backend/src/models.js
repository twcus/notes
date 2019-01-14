const models = {
    user: {
        name: String,
        createdAt: Date,
        updatedAt: Date,
        notes: [Array('note'), 'creator'],
        collections: [Array('collection'), 'creator'],
        tags: [Array('tag'), 'creator']
    },
    note: {
        content: String,
        createdAt: Date,
        updatedAt: Date,
        creator: ['user', 'notes'],
        tags: [Array('tag'), 'notes']
    },
    collection: {
        createdAt: Date,
        updatedAt: Date,
        creator: ['user', 'collections'],
        tags: [Array('tag'), 'collections']
    },
    tag: {
        createdAt: Date,
        updatedAt: Date,
        creator: ['user', 'tags'],
        notes: [Array('note'), 'tags'],
        collections: [Array('collection'), 'tags']
    }
};

export default models;