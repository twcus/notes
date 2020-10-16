import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class CollectionNotesRoute extends Route {
    controllerName = 'notes';

    model(params) {
        return RSVP.hash({
            collection: this.store.findRecord('collection', params.collection_id, { include: 'tags' }),
            tags: this.store.findAll('tag')
        }).then(model => {
            // Request looks like notes?filter[tags]=1,2,3 - not sure if this is the best way to accomplish this, but it works
            model.notes = this.store.query('note', { filter: { tags: model.collection.hasMany('tags').ids().join(',') }})
            return model;
        });
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        if (this.controller.viewMode.isEditorOpen) {
            this.transitionTo('notes.edit', this.controller.sortedNotes[0].id);
        }
    }

    renderTemplate(controller, model) {
        this.render('notes', {
            controller
        })
    }

    @action
    willTransition(transition) {
        if (transition.targetName === 'collection-notes.index' && this.controller.viewMode.isEditorOpen) {
            this.transitionTo('collection-notes.edit', this.controllerFor('notes').sortedNotes[0].id);
        }
    }
}
