import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotesNewRoute extends Route {
    @service('active-note') activeNote;

    model() {
        return this.store.createRecord('note');
    }

    @action
    willTransition() {
        this.activeNote.note = null;
    }
}
