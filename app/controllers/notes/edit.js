import Controller from '@ember/controller';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIME = 500;
const FORCE_TIME = 5000;

export default class NotesEditController extends Controller {
    tagSortKey = ['content:asc'];

    @service router;
    @service store;
    @service notifications;
    @service media;

    @tracked viewMode;
    @tracked collectionTags;
    @sort('model.tags', 'tagSortKey') sortedTags;

    get isCollection() {
        return !isNone(this.model.collection);
    }

    get baseNotesRoute() {
        return this.isCollection ? 'collection-notes' : 'notes';
    }

    @action
    transitionToNotes() {
        this.router.transitionTo(this.baseNotesRoute);
    }

    @action
    deleteNote(note) {
        return note.destroyRecord()
            .then(() => {
                this.notifications.clearAll().success('Note was deleted.');
                this.transitionToNotes();
            })
            .catch(res => this.notifications.clearAll().error(res));
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
