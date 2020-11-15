import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class CollectionNoteEditRoute extends Route {
    controllerName = 'notes.edit';

    model(params) {
        return RSVP.hash({
            note: this.store.findRecord('note', params.note_id, { include: 'tags' }),
            tags: this.modelFor('collection-notes').tags,
            collection: this.modelFor('collection-notes').collection
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.collectionTags = model.collection.tags;
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    renderTemplate(controller, model) {
        this.render('notes.edit', {
            controller
        })
    }

    @action
    willTransition(transition) {
        let notesController = this.controllerFor('notes');
        if (this.controller.model.note.hasDirtyAttributes) {
            this.controller.saveNoteTask.perform(this.controller.model.note);
        }
        if (transition.targetName === 'notes.index' && notesController.viewMode.isEditorOpen && notesController.firstNoteInOrder) {
            this.transitionTo('notes.edit', notesController.firstNoteInOrder.id);
        } else if (transition.targetName === 'collection-notes' && notesController.viewMode.isEditorOpen && notesController.firstNoteInOrder) {
            this.transitionTo('collection-notes.edit', notesController.firstNoteInOrder.id);
        }
    }
}
