import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

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
    willTransition() {
        let note = this.controller.model.note;
        if (!note.isDeleted) {
            if (note && !note.content && !note.tags.length) {
                this.controller.model.note.destroyRecord();
            } else {
                this.controller.saveNoteTask.perform(note);
                // Not sure if this is best practice, but couldn't figure out another way to refresh the collection notes,
                // which weren't refreshing after a new note was created.
                this.send('reload');
            }
        }
    }
}
