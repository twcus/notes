import Component from '@ember/component';

export default Component.extend({
    isAddingNote: false,
    isShowingModal: false,
    activeNote: null,
    toggleNewNote: function() {
        this.toggleProperty('isAddingNote');
    },
    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    },
    actions: {
        openNewNote() {
            this.toggleNewNote();
        },
        createNote(note) {
            this.toggleNewNote();
            //this.saveNote(note);
        },
        openNote(note) {
            this.toggleModal();
            this.set('activeNote', note);
            console.log('opening note...' + note);
        },
        closeNote() {
            this.toggleModal();
        },
        // saveNote(content) {
        //     console.log(content);
        //     this.toggleModal();
        // }
    }
});
