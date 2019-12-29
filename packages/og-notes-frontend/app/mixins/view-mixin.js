import Mixin from '@ember/object/mixin';

export default Mixin.create({
    currentView: 'cards',
    actions: {
        changeView(view) {
            this.set('currentView', view);
        }
    }
});
