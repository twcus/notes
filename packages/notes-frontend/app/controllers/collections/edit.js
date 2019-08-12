import CollectionsController from '../collections';

export default CollectionsController.extend({
    transitionToCollections() {
        this.transitionToRoute('collections');
    },
    actions: {
        saveCollection(collection) {
            this._super(collection)
                .then(() => {
                    this.transitionToCollections();
                });
        },
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
