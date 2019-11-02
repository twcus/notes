import Route from '@ember/routing/route';

export default class NotesNewRoute extends Route {
    model() {
        return this.store.createRecord('note');
    }
}
