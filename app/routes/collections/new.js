import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class CollectionsNewRoute extends Route {
    @service store;
    
    model() {
        return RSVP.hash({
            collection: this.store.createRecord('collection'),
            collections: this.modelFor('collections').collections,
            tags: this.store.findAll('tag')
        });
    }

    @action
    willTransition() {
        let collection = this.controller.model.collection;
        if (collection.isNew) {
            collection.destroyRecord();
        }
    }
}
