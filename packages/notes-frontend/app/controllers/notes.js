import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class NotesController extends Controller {
    @action
    deleteNote(note) {
        console.log(`in delete note in notes controller ${note}`);
        return note.destroyRecord();
    }
}
