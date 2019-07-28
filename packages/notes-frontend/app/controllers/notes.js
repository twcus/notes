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
        getAllTags() {
            return this.store.findAll('tag');
        },
        createTag(note, content) {

            let tag = this.store.createRecord('tag', {
                content
            });
            tag.get('notes').pushObject(note);
            tag.save();
            // let input = document.querySelector('.ember-power-select-trigger-multiple-input');
            // input.value='';
        },
        addTag(note, tags) {
            note.set('tags', tags);
            note.save();
            // let input = document.querySelector('.ember-power-select-trigger-multiple-input');
            // input.value='';
        }
    }
});
