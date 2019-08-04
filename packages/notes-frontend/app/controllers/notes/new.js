import NotesController from '../notes';

export default NotesController.extend({
    transitionToNotes() {
        this.transitionToRoute('notes');
    },
    actions: {
        closeNote() {
            this.transitionToNotes();
        },
        saveNote(note) {
            let noteRecord = this.store.createRecord('note', note);
            noteRecord.save();
            this.transitionToNotes();
        }
    }
});
