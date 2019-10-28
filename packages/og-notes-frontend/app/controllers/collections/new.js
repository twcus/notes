import CollectionsController from '../collections';

export default CollectionsController.extend({
    actions: {
        createTag(collection, content) {
            let tag = this.store.createRecord('tag', {
                content
            });
            tag.save();
            collection.tags.pushObject(tag);
        },
        getAllTags() {
            return this.store.findAll('tag');
        },
        addTag(collection, tags) {
            collection.set('tags', tags);
        }
    }
});
