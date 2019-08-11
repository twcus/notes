import Component from '@ember/component';

export default Component.extend({
    classNames: ['card-grid'],
    actions: {
        deleteCollection(collection) {
            this.deleteCollection(collection);
        }
    }
});
