import fortune from 'fortune';
import jwt from 'jsonwebtoken';

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
        case methods.create: {
            // Here is where the JWT would be validated against the user.
            record = updateCreatedDate(record);
            return record;
        }
        case methods.update: {
            if (update.replace && update.content !== record.content) {
                const { replace: { content, tags } } = update;
                update.replace = { content, tags };
                updateModifiedDate(update);
            }
        }
    }
};

const collectionInputHook = (context, record, update) => {
    switch (context.request.method) {
        case methods.create: return updateCreatedDate(record);
        case methods.update: return updateModifiedDate(update);
        default: break;
    }
    return record;
};

const tagInputHook = (context, record, update) => {
    switch (context.request.method) {
        case methods.create: return updateCreatedDate(record);
        case methods.update: return updateModifiedDate(update);
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
