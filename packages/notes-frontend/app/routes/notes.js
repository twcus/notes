import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class NotesRoute extends Route {
    model() {
        return RSVP.hash({
            notes: this.store.findAll('note'),
            tags: this.store.findAll('tag')
        });
    }
}
