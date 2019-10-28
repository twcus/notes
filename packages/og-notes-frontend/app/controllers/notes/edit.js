import NotesController from '../notes';

export default NotesController.extend({
    isShowingTags: false,
    transitionToNotes() {
        this.transitionToRoute('notes');
    },
    actions: {
        undoChanges(note) {
            note.rollbackAttributes();
        },
        saveNote(note) {
            note.save();
            this.transitionToNotes();
        }
    }
});
