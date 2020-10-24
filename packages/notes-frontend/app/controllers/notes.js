import Controller from '@ember/controller';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { isNone } from '@ember/utils';
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

    tagSortKey = ['content:asc'];

    transitionWithEditorOpen() {
        if (this.firstNoteInOrder) {
            this.transitionToRoute(`${this.baseNotesRoute}.edit`, this.firstNoteInOrder.id);
        } else {
            this.transitionToNotes();
        }
    }

    @tracked viewMode = this.viewModeOptions[0];
    @tracked isTaskRunning = this.saveNoteTask.isRunning;
    @tracked sortProperty = this.sortOptions[0];
    @tracked tagFilters = [];
    @tracked sortOrder;
    @tracked searchQuery;
    @tracked collectionName;
    @tracked collectionError;
    @tracked isConfirmingDelete = false;
    @tracked noteForDeletion;
    @sort('searchedNotes', 'sortPropertyWithOrder') sortedNotes;
    @sort('model.tags', 'tagSortKey') sortedTags;

    get allNotes() {
        return this.model.notes;
    }

    get filteredNotes() {
        if (this.tagFilters) {
            return this.allNotes.filter(note => this.tagFilters.every(tag => note.tags.includes(tag)));
        }
        return this.allNotes;
    }

    get searchedNotes() {
        if (this.searchQuery) {
            return this.filteredNotes.filter(note => {
                if (note.content) {
                    return note.content.includes(this.searchQuery);
                }
                return false;
            });
        }
        return this.filteredNotes;
    }

    get sortPropertyWithOrder() {
        let order = this.sortOrder ? this.sortOrder.order : this.defaultSortOrder;
        return [`${this.sortProperty.property}:${order}`];
    }

    get firstNoteInOrder() {
        return this.sortedNotes[0];
    }

    get isCollection() {
        return !isNone(this.model.collection);
    }

    get baseNotesRoute() {
        return this.isCollection ? 'collection-notes' : 'notes';
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
            this.transitionWithEditorOpen();
        } else {
            this.transitionToNotes();
        }
    }

    @action
    transitionToNotes() {
        this.transitionToRoute(this.baseNotesRoute);
    }

    @action
    deleteNote(note) {
        return note.destroyRecord()
            .then(() => {
                this.model.notes.removeObject(note);
                this.transitionToNotes();
            });
    }

    @action
    saveNote(note) {
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
    updateTagFilters(tags) {
        this.tagFilters = tags;
        if (this.viewMode.isEditorOpen) {
            this.transitionWithEditorOpen();
        }
    }

    @action
    removeFilteredTag(tag) {
        this.tagFilters.removeObject(tag);
        if (this.viewMode.isEditorOpen) {
            this.transitionWithEditorOpen();
        }
    }

    @action
    saveCollection() {
        let collection = this.store.createRecord('collection', {
            name: this.collectionName,
            tags: this.tagFilters
        });
        let collectionValidation = collection.validate(this.model.collections);
        if (collectionValidation.status) {
            this.collectionError = null;
            this.collectionName = null;
            return collection.save();
        } else {
            collection.destroyRecord();
            this.collectionError = collectionValidation.message;
        }
    }

    @action
    updatedNote(note) {
        this.updateNoteTask.perform(note);
    }

    @action
    onDeleteOpen(note) {
        this.isConfirmingDelete = true;
        this.noteForDeletion = note;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.noteForDeletion.destroyRecord();
        }
        this.noteForDeletion = null;
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
