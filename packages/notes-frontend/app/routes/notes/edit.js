import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class NotesEditRoute extends Route {
    model(params) {
        return RSVP.hash({
            note: this.store.findRecord('note', params.note_id, { include: 'tags' }),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    @action
    willTransition(transition) {
        if (this.controller.model.note.hasDirtyAttributes) {
            this.controller.saveNoteTask.perform(this.controller.model.note);
        }
        if (transition.targetName === 'notes.index' && this.controllerFor('notes').viewMode.isEditorOpen) {
            this.transitionTo('notes.edit', this.controllerFor('notes').sortedNotes[0].id);
        }
    }
}
