import Component from '@ember/component';

export default Component.extend({
    isAddingNote: false,
    actions: {
        openNewNote() {
            this.toggleProperty('isAddingNote');
        },
        createNewNote() {
            console.log('Creating new note...');
        }
    }
});
