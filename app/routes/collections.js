import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class CollectionsRoute extends Route {
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
        return RSVP.hash({
            collections: this.store.findAll('collection', { include: 'tags' }),
            tags: this.store.findAll('tag')
        });
    }

    afterModel() {
        this.navigation.subtitle = 'Collections';
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        controller.tagFilters = [];
        controller.searchQuery = null;
    }
}
