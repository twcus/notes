import Route from '@ember/routing/route';

export default class NotesEditRoute extends Route {
    model(params) {
        return this.store.find('note', params.note_id);
    }
}
