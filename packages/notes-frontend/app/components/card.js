import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    classNames: ['note-card'],
    isShowingConfirmationPrompt: false,
    click() {
        this.onClick(this.get('note'));
    },
    mouseleave() {
        this.set('isShowingConfirmationPrompt', false);
    },
    toggleConfirmationPrompt: function() {
        this.toggleProperty('isShowingConfirmationPrompt');
    },
    actions: {
        confirm() {
            this.toggleConfirmationPrompt();
            this.get('note').destroyRecord();
        },
        showConfirmationPrompt() {
            this.toggleConfirmationPrompt();
            console.log('showing confirmation prompt...');
        },
        hideConfirmationPrompt() {
            this.toggleConfirmationPrompt();
            console.log('hiding confirmation prompt...');
        }
    }
});
