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
        if (!this.controller.model.note.content) {
            this.controller.model.note.destroyRecord();
        }
    }
}
