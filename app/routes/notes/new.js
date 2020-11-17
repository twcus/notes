import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class NotesNewRoute extends Route {
    @service editorFocus;

    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.collectionTags = [];
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    @action
    willTransition() {
        let note = this.controller.model.note;
        if (!note.isDeleted) {
            if (note && !note.content && !note.tags.length) {
                note.destroyRecord();
            } else {
                // Keep track of the focused element during the transition.
                this.editorFocus.setFocusedElement(document.activeElement);
                this.controller.saveNoteTask.perform(note);
            }
        }
    }
}
