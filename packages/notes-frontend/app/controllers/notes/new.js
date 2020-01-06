import NotesController from './edit';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class NotesEditController extends NotesController {
    @service router;

    @(task(function *(note) {
        yield note.save()
            .then(note => {
                if (this.router.isActive('notes.new')) {
                    this.transitionToRoute('notes.edit', note.id);
                }
            });
    }).keepLatest()) saveNoteTask;
}
