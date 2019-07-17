import Component from '@ember/component';

export default Component.extend({
    isAddingNote: false,
    isShowingOverlay: false,
    activeNote: null,
    toggleNewNote: function() {
        this.toggleProperty('isAddingNote');
    },
    toggleOverlay: function() {
        this.toggleProperty('isShowingOverlay');
    },
    actions: {
        openNewNote() {
            this.toggleNewNote();
        },
        createNote(note) {
            this.toggleNewNote();
            this.saveNote(note);
        },
        openNote(note) {
            this.toggleOverlay();
            this.set('activeNote', note);
            console.log('opening note...' + note);
        },
        closeNote() {
            this.toggleOverlay();
        }
    }
});
