import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TagsRoute extends Route {
    @service session;
    @service store;
    @service router;
    @service navigation;

    beforeModel() {
        if (!this.session.isAuthenticated) {
            this.router.transitionTo('login');
        }
    }

    model() {
        return this.store.findAll('tag');
    }

    afterModel() {
        this.navigation.subtitle = 'Tags';
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        controller.searchQuery = null;
    }
}
