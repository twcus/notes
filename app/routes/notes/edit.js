import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotesEditRoute extends Route {
    @service router;
    @service store;
    @service media;

    model(params) {
        return RSVP.hash({
            note: this.store.findRecord('note', params.note_id, { include: 'tags' }),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.collectionTags = [];
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    @action
    willTransition(transition) {
        const notesController = this.controllerFor('notes');
        if (this.controller.model.note.hasDirtyAttributes) {
            this.controller.saveNoteTask.perform(this.controller.model.note);
        }
        if (transition.targetName === 'notes.index' && notesController.viewMode.isEditorOpen && notesController.firstNoteInOrder && this.media.isDesktop) {
            this.router.transitionTo('notes.edit', notesController.firstNoteInOrder.id);
        }
    }
}
