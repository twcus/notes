import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object'

export default class CollectionNotesNewRoute extends Route {
    controllerName = 'notes.new';

    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.modelFor('collection-notes').tags,
            collection: this.modelFor('collection-notes').collection
        });
    }

    afterModel(model) {
        model.note.tags = model.collection.tags;
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.collectionTags = model.collection.tags;
        this.controller.viewMode = this.controllerFor('notes').viewMode;
    }

    renderTemplate(controller, model) {
        this.render('notes.new', {
            controller
        })
    }

    @action
    willTransition(transition) {
        let note = this.controller.model.note;
        if (!note.isDeleted) {
            // Don't transition to edit route if the note is empty.
            if (note && !note.content && note.tags.length === this.controller.model.collection.tags.length) {
                if (transition.targetName === 'collection-notes.edit') {
                    transition.abort();
                } else {
                    note.destroyRecord();
                }
            } else {
                // The reload below caused a timing issue with the transition, so setting this variable here to determine if after saving
                // the app should transition to the index or edit route. TODO Reevaluate this logic for both notes and collection-notes.
                let shouldTransitionToEdit = transition.targetName !== 'collection-notes.index';
                this.controller.saveNoteTask.perform(note, shouldTransitionToEdit);
                // Not sure if this is best practice, but couldn't figure out another way to refresh the collection notes,
                // which weren't refreshing after a new note was created.
                this.send('reload');
            }
        }
    }
}
