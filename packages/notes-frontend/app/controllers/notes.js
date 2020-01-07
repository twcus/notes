import Controller from '@ember/controller';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIME = 500;
const FORCE_TIME = 5000;

export default class NotesController extends Controller {
    defaultSortOrder = 'desc';
    viewModeOptions = [
        {
            name: 'Card',
            icon: 'th',
            component: 'card',
            editorComponent: 'modal',
            isEditorOpen: false
        },
        {
            name: 'List',
            icon: 'bars',
            component: 'list',
            editorComponent: 'pane',
            isEditorOpen: true
        }
    ];

    sortOptions = [
        {
            property: 'modifiedDate',
            name: 'Last Modified Date'
        },
        {
            property: 'createdDate',
            name: 'Created Date'
        }
    ];

    @tracked viewMode = this.viewModeOptions[0];
    @tracked isTaskRunning = this.saveNoteTask.isRunning;
    @tracked sortProperty = this.sortOptions[0];
    @tracked sortOrder;

    @sort('model.notes', 'sortPropertyWithOrder') sortedNotes;

    get sortPropertyWithOrder() {
        let order = this.sortOrder ? this.sortOrder.order : this.defaultSortOrder;
        return [`${this.sortProperty.property}:${order}`];
    }

    @action
    selectSortProperty(property) {
        this.sortProperty = property;
    }

    @action
    selectSortOrder(order) {
        this.sortOrder = order;
    }

    @action
    selectViewMode(mode) {
        this.viewMode = mode;
        if (mode.isEditorOpen) {
            this.transitionToRoute('notes.edit', this.sortedNotes[0].id);
        } else {
            this.transitionToNotes();
        }
    }

    @action
    transitionToNotes() {
        this.transitionToRoute('notes');
    }

    @action
    deleteNote(note) {
        console.log(`in delete note in notes controller ${note}`);
        let result = note.destroyRecord()
            .then(() => {
                this.transitionToNotes();
            });
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
    removeTagFromNote(tag, note) {
        note.tags.removeObject(tag);
        return note.save();
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
