import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIME = 500;
const FORCE_TIME = 5000;
const VIEW_MODES = {
    cards: 'list-cards',
    panes: 'list-pane'
};

export default class NotesController extends Controller {
    viewOptions = [
        {
            content: 'Card',
            icon: 'th',
            component: 'card'
        },
        {
            content: 'List',
            icon: 'bars',
            component: 'pane'
        }
    ];

    @tracked viewMode = 'cards';
    @tracked editMode = 'modal';
    @tracked selectedViewMode = this.viewOptions[0];
    @tracked isTaskRunning = this.saveNoteTask.isRunning;

    get viewComponent() {
        return VIEW_MODES[this.viewMode];
    }

    @action
    selectViewMode(mode) {
        this.selectedViewMode = mode;
    }

    @action
    transitionToNotes() {
        this.transitionToRoute('notes');
    }

    @action
    changeViewMode() {

    }

    @action
    deleteNote(note) {
        console.log(`in delete note in notes controller ${note}`);
        let result = note.destroyRecord();
        this.transitionToNotes();
        return result;
    }

    @action
    saveNote(note) {
        console.log('in save note in notes controller');
        note.save();
    }

    @action
    createTagAndAddToNote(content, note) {
        let notes = [note];
        let tag = this.store.createRecord('tag', {
            content,
            notes
        });
        return tag.save();
    }

    @action
    updatedNote(note) {
        this.updateNoteTask.perform(note);
    }

    @(task(function *(note) {
        yield note.save();
    }).keepLatest()) saveNoteTask;

    @(task(function *(note) {
        this.forceSaveTask.perform(note);
        yield timeout(DEBOUNCE_TIME);
        this.forceSaveTask.cancelAll();
        this.saveNoteTask.perform(note);
    }).restartable()) updateNoteTask;

    @(task(function *(note) {
        yield timeout(FORCE_TIME);
        this.saveNoteTask.perform(note);
    }).drop()) forceSaveTask;
}
