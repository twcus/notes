import NotesController from '../notes';

export default NotesController.extend({
    transitionToNotes() {
        this.transitionToRoute('notes');
    },
    actions: {
        closeNote(note) {
            note.rollbackAttributes();
            this.transitionToNotes();
        },
        saveNote(note) {
            note.save();
            this.transitionToNotes();
        }
    }
});
