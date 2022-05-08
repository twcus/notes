const models = {
    account: {
        username: String,
        password: String,
        created_date: Date,
        modified_date: Date,
        notes: [Array('note'), 'account'],
        collections: [Array('collection'), 'account'],
        tags: [Array('tag'), 'account']
    },
    note: {
        content: String,
        created_date: Date,
        modified_date: Date,
        account: ['account', 'notes'],
        tags: [Array('tag'), 'notes']
    },
    collection: {
        name: String,
        created_date: Date,
        modified_date: Date,
        account: ['account', 'collections'],
        tags: [Array('tag'), 'collections']
    },
    tag: {
        content: String,
        created_date: Date,
        modified_date: Date,
        account: ['account', 'tags'],
        notes: [Array('note'), 'tags'],
        collections: [Array('collection'), 'tags']
    }
};

export default models;
