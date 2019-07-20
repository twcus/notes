import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        openNote(note) {
            this.transitionToRoute('notes.edit', note.get('id'));
        },
        saveNote(note) {
            note.save();
        },
        deleteNote(note) {
            note.destroyRecord();
        },
    }
});
