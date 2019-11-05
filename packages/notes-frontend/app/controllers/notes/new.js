import NotesController from './edit';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class NotesEditController extends NotesController {
    @service('active-note') activeNote;
    @service('router') router;

    @(task(function *() {
        yield this.model.save()
            .then(note => {
                if (this.router.isActive('notes.new')) {
                    // the conditional ensures the activeNote is not set if the user immediately transitions to another
                    // route before the first save finishes
                    this.activeNote.setActiveNote(note);
                }
            });
    }).keepLatest()) saveModelTask;
}
