import NotesController from '../notes';
import { action } from '@ember/object';

export default class NotesEditController extends NotesController {
    @action
    transitionToNotes() {
        this.transitionToRoute('notes');
    }
}
