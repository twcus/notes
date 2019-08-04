import Controller from '@ember/controller';

export default Controller.extend({
    currentView: null,
    actions: {
        openNote(note) {
            this.transitionToRoute('notes.edit', note.get('id'));
        },
        createTag(note, content) {
            let tag = this.store.createRecord('tag', {
                content
            });
            tag.get('notes').pushObject(note);
            tag.save();
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
        addTag(note, tags) {
            note.set('tags', tags);
            note.save();
        },
        changeView(view) {
            this.set('currentView', view);
        },
        searchNotes(searchText) {
            console.log(searchText);
        },
        filterNotes(filter) {
            console.log(filter);
        },
        sortNotes(sort) {
            console.log(sort);
        }
    }
});
