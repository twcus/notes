import Component from '@ember/component';

export default Component.extend({
    actions: {
        saveNote(note) {
            this.onSave(note);
        },
        selectTag(tags) {
            debugger;
            this.onSelectTag(this.get('model'), tags);
        },
        createTag(tag) {
            this.onCreateTag(this.get('model'), tag);
        },
        getAllTags() {
            return this.getAllTags();
        },
        showTags() {
            this.toggleProperty('isShowingTags');
        }
    }
});
