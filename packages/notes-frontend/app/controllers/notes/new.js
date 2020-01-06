import NotesController from './edit';
import { task } from 'ember-concurrency';

export default class NotesEditController extends NotesController {
    @(task(function *(note) {
        yield note.save()
            .then(note => {
                this.transitionToRoute('notes.edit', note.id);
            });
    }).keepLatest()) saveNoteTask;
}
