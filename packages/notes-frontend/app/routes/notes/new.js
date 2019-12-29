import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class NotesNewRoute extends Route {
    @service('active-note') activeNote;

    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.store.findAll('tag')
        });
    }

    @action
    willTransition() {
        this.activeNote.note = null;
    }
}
