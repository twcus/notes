import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class CollectionNotesNewRoute extends Route {
    controllerName = 'notes.new';

    model() {
        return RSVP.hash({
            note: this.store.createRecord('note'),
            tags: this.store.findAll('tag'),
            collection: this.modelFor('collection-notes').collection
        });
    }

    setupController(controller, model) {
        super.setupController(controller, model);
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
            }
        }
    }
}
