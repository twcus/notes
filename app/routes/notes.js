import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotesRoute extends Route {
    @service session;
    @service navigation;
    @service media;

    beforeModel() {
        if (!this.session.isAuthenticated) {
            this.transitionTo('login');
        }
    }

    model() {
        return RSVP.hash({
            notes: this.store.findAll('note'),
            tags: this.store.findAll('tag'),
            collections: this.store.findAll('collection')
        });
    }

    afterModel() {
        this.navigation.subtitle = 'All Notes';
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        controller.tagFilters = [];
        controller.collectionTags = [];
        controller.searchQuery = null;
        if (this.controller.viewMode.isEditorOpen && this.controller.sortedNotes.length && this.media.isDesktop) {
            this.transitionTo('notes.edit', this.controller.sortedNotes[0].id);
        }
    }

    @action
    willTransition(transition) {
        if (transition.targetName === 'notes.index' && this.controller.viewMode.isEditorOpen) {
            this.transitionTo('notes.edit', this.controllerFor('notes').sortedNotes[0].id);
        }
    }
}
