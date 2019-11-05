import NotesController from './edit';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class NotesEditController extends NotesController {
    @service('active-note') activeNote;

    @(task(function *() {
        yield this.model.save()
            .then(note => {
                debugger;
                this.activeNote.setActiveNote(note);
            });
    }).keepLatest()) saveModelTask;
}
