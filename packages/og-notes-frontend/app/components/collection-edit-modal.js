import Component from '@ember/component';

export default Component.extend({
    actions: {
        saveAndClose() {
            let collection = this.get('collection');
            this.onSaveAndClose(collection);
        },
        selectTag(tag) {
            let collection = this.get('collection');
            this.onSelectTag(collection, tag);
        },
        createTag(tag) {
            let collection = this.get('collection');
            this.onCreateTag(collection, tag);
        },
        getAllTags() {
            return this.onGetAllTags();
        }
    }
});
