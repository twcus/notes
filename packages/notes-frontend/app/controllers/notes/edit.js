import NotesController from '../notes';

const tagList = [
    {
        content: 'Civil War'
    },
    {
        content: 'Custer'
    },
    {
        content: 'Battle of Bull Run'
    }
];

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
        },
        showTags() {
            this.set('tagList', tagList);
            this.toggleProperty('isShowingTags');
        }
    }
});
