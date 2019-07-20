import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    classNames: ['card'],
    isConfirming: false,
    mouseLeave () {
        this.set('isConfirming', false);
    },
    click() {
        this.onClick();
    },
    toggleIsConfirming: function() {
        this.toggleProperty('isConfirming');
    },
    actions: {
        confirm() {
            this.toggleIsConfirming();
            this.onConfirm();
        },
        toggleConfirmationPrompt() {
            this.toggleIsConfirming();
        },
        openTagSelector() {
            console.log('opening tag selector...');
        }
    }
});
