import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIME = 500;
const FORCE_TIME = 5000;

export default class NotesController extends Controller {
    @action
    transitionToNotes() {
        this.transitionToRoute('notes');
    }

    @action
    deleteNote(note) {
        console.log(`in delete note in notes controller ${note}`);
        let result = note.destroyRecord();
        this.transitionToNotes();
    }

    @action
    saveNote(note) {
        console.log('in save note in notes controller');
        note.save();
    }

    @action
    updatedNote() {
        this.updateModelTask.perform();
    }

    @(task(function *() {
        yield this.model.save();
    }).keepLatest()) saveModelTask;

    @(task(function *() {
        this.forceSaveTask.perform();
        yield timeout(DEBOUNCE_TIME);
        this.forceSaveTask.cancelAll();
        this.saveModelTask.perform();
    }).restartable()) updateModelTask;

    @(task(function *() {
        yield timeout(FORCE_TIME);
        this.saveModelTask.perform();
    }).drop()) forceSaveTask;

    @tracked isTaskRunning = this.saveModelTask.isRunning;

}
