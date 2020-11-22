import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class CollectionsEditRoute extends Route {
    model(params) {
        return RSVP.hash({
            collection: this.store.findRecord('collection', params.collection_id, { include: 'tags' }),
            collections: this.modelFor('collections').collections,
            tags: this.store.findAll('tag')
        });
    }

    @action
    willTransition() {
        this.controller.isDeleting = false;
        if (!this.controller.model.collection.isDeleted) {
            this.controller.model.collection.reload();
        }
    }
}
