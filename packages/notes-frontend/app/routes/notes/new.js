import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class NotesNewRoute extends Route {
    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    @action
    willTransition() {
        let note = this.controller.model.note;
        if (note && !note.content && !note.tags.length && !note.isDeleted) {
            this.controller.model.note.destroyRecord();
        } else {
            this.controller.saveNoteTask.perform(note);
        }
    }
}
