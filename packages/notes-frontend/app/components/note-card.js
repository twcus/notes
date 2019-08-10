import Component from '@ember/component';

export default Component.extend({
    classNames: ['card'],
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
            this.onDelete(this.get('note'));
        },
        toggleConfirmationPrompt() {
            this.toggleIsConfirming();
        },
        openTagSelector() {
            console.log('opening tag selector...');
        }
    }
});
