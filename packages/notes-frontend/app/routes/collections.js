import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class CollectionsRoute extends Route {
    model() {
        return RSVP.hash({
            // TODO Sort the tags alphabetically (this needs to be done in every list of tags across all pages, so probably better to sort them on backend when requested)
            collections: this.store.findAll('collection', { include: 'tags' }),
            tags: this.store.query('tag', { sort: 'content' })
        });
    }

    afterModel() {
        this.controllerFor('application').navSubtitle = 'Collections';
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        controller.tagFilters = [];
        controller.searchQuery = null;
    }
}
