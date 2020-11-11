import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TagsRoute extends Route {
    @service session;

    beforeModel(transition) {
        if (!this.session.isAuthenticated) {
            this.transitionTo('login');
        }
    }

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
