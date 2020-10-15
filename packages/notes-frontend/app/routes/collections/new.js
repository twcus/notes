import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class CollectionsNewRoute extends Route {
    model() {
        return RSVP.hash({
            collection: this.store.createRecord('collection'),
            tags: this.store.findAll('tag')
        });
    }

    @action
    willTransition() {
        let collection = this.controller.model.collection;
        if (collection.isNew) {
            collection.destroyRecord();
        }
        this.controller.errorMessage = null;
    }
}
