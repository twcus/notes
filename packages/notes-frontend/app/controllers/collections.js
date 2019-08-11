import Controller from '@ember/controller';

export default Controller.extend({
    currentView: 'cards',
    actions: {
        createCollection(collection) {
            let collectionRecord = this.store.createRecord('collection', {
                tags: collection.tags
            });
            return collectionRecord.save();
        },
        saveCollection(collection)  {
            collection.save();
        },
        deleteCollection(collection) {
            collection.destroyRecord();
        },
        changeView(view) {
            this.set('currentView', view);
        },
        searchCollections(searchText) {
            console.log(searchText);
        },
        filterCollections(filter) {
            console.log(filter);
        },
        sortCollections(sort) {
            console.log(sort);
        }
    }
});
