import fortune from 'fortune';

const { methods } = fortune;

const updateCreatedDate = record => {
    let date = new Date();
    record.createdDate = record.modifiedDate = date;
    return record;
};

const updateModifiedDate = update => {
    update.replace.modifiedDate = new Date();
    return update;
};

const noteInputHook = (context, record, update) => {
    switch (context.request.method) {
        case methods.create: return updateModifiedDate(updateCreatedDate(record));
        case methods.update: {
            if (update.replace && update.content !== record.content) {
                return updateModifiedDate(update);
            }
            return update;
        }
        default: break;
    }
    return record;
};

const collectionInputHook = (context, record) => {
    switch (context.request.method) {
        case methods.create: return updateModifiedDate(updateCreatedDate(record));
        case methods.update: return updateModifiedDate(record);
        default: break;
    }
    return record;
};

const tagInputHook = (context, record) => {
    switch (context.request.method) {
        case methods.create: return updateModifiedDate(updateCreatedDate(record));
        case methods.update: return updateModifiedDate(record);
        default: break;
    }
    return record;
};

const hooks = {
    note: [noteInputHook],
    collection: [collectionInputHook],
    tag: [tagInputHook]
};

export default hooks;
