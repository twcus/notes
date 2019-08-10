import Component from '@ember/component';

export default Component.extend({
    classNames: ['card-grid'],
    actions: {
        deleteNote(note) {
            this.deleteNote(note);
        }
    }
});
