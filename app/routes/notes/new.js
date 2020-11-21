import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class NotesNewRoute extends Route {
    @service editorFocus;
    @service media;

    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.store.findAll('tag')
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.collectionTags = [];
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    @action
    willTransition(transition) {
        const note = this.controller.model.note;
        const notesController = this.controllerFor('notes');
        if (!note.isDeleted) {
            // Don't transition to edit route if the note is empty.
            if (note && !note.content && !note.tags.length) {
                if (transition.targetName === 'notes.edit' && note.id) {
                    transition.abort();
                } else {
                    note.destroyRecord();
                    if (transition.targetName === 'notes.index' && notesController.viewMode.isEditorOpen && notesController.firstNoteInOrder && this.media.isDesktop) {
                        this.transitionTo('notes.edit', notesController.firstNoteInOrder.id);
                    }
                }
            } else {
                // Keep track of the focused element during the transition.
                this.editorFocus.setFocusedElement(document.activeElement);
                this.controller.saveNoteTask.perform(note);
            }
        }
    }
}
