import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    classNames: ['card'],
    classNameBindings: ['isNew:is-new'],
    isNew: alias('collection.isNew'),
    isConfirming: false,
    mouseLeave() {
        this.set('isConfirming', false);
    },
    toggleIsConfirming: function() {
        this.toggleProperty('isConfirming');
    },
    actions: {
        confirmDelete() {
            this.toggleIsConfirming();
            this.onDelete(this.get('collection'));
        },
        toggleConfirmationPrompt() {
            this.toggleIsConfirming();
        }
    }
});
