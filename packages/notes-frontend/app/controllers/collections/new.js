import CollectionsController from '../collections';
import { set } from '@ember/object';

export default CollectionsController.extend({
    transitionToCollections() {
        this.transitionToRoute('collections');
    },
    actions: {
        createCollection(collection) {
            this._super(collection)
                .then((result) => {
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
            set(collection, 'tags', tags);
        },
    }
});
