import Component from '@ember/component';

export default Component.extend({
    classNames: ['card'],
    actions: {
        confirmDelete() {
            this.onDelete();
        }
    }
});
