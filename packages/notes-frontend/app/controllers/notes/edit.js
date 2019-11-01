import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class NotesEditController extends Controller {
    @action
    transitionToNotes() {
        this.transitionToRoute('notes');
    }
}
