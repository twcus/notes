import Component from '@ember/component';

export default Component.extend({
    actions: {
        saveNewNote() {
            this.onSave();
        },
        cancelNewNote() {
            this.onCancel();
        }
    }
});
