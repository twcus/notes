import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class NotesEditRoute extends Route {
    model(params) {
        return RSVP.hash({
            note: this.store.findRecord('note', params.note_id, { include: 'tags' }),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        this.controller.activeViewMode = this.controllerFor('notes').activeViewMode;
    }
}
