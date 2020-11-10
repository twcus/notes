import Route from '@ember/routing/route';

export default class TagsRoute extends Route {
    model() {
        return this.store.findAll('tag');
    }

    afterModel() {
        this.controllerFor('application').navSubtitle = 'Tags';
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        controller.searchQuery = null;
    }
}
