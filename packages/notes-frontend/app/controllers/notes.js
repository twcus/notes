import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        saveNote(note) {
            note.save();
        },
        deleteNote(note) {
            note.destroyRecord();
        },
    }
});
