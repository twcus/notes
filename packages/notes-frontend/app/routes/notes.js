import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class NotesRoute extends Route {
    model() {
        return RSVP.hash({
            notes: this.store.findAll('note'),
            tags: this.store.findAll('tag'),
            collections: this.store.findAll('collection')
        });
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        if (this.controller.viewMode.isEditorOpen) {
            this.transitionTo('notes.edit', this.controller.sortedNotes[0].id);
        }
    }

    @action
    willTransition(transition) {
        if (transition.targetName === 'notes.index' && this.controller.viewMode.isEditorOpen) {
            this.transitionTo('notes.edit', this.controllerFor('notes').sortedNotes[0].id);
        }
    }
}
