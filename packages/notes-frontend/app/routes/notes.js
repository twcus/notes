import Route from '@ember/routing/route';

export default class NotesRoute extends Route {
    model() {
        return this.store.findAll('note');
    }
}
