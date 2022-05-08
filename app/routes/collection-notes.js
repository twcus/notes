import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class CollectionNotesRoute extends Route {
    controllerName = 'notes';

    @service session;
    @service store;
    @service router;
    @service navigation;
    @service media;

    beforeModel() {
        if (!this.session.isAuthenticated) {
            this.router.transitionTo('login');
        }
    }

    model(params) {
        return RSVP.hash({
            collection: this.store.findRecord('collection', params.collection_id, { include: 'tags' }),
            tags: this.store.findAll('tag')
        }).then(model => {
            // Request looks like notes?filter[tags]=1,2,3 - not sure if this is the best way to accomplish this, but it works
            model.notes = this.store.query('note', { filter: { tags: model.collection.hasMany('tags').ids().join(',') }})
            return RSVP.hash(model);
        });
    }

    afterModel(model) {
        this.navigation.subtitle = model.collection.name;
        return model;
    }

    setupController(controller, model, _transition) {
        super.setupController(controller, model, _transition);
        this.controller.tagFilters = [];
        this.controller.collectionTags = model.collection.tags;
        if (this.controller.viewMode.isEditorOpen && this.controller.sortedNotes.length && this.media.isDesktop) {
            this.router.transitionTo('collection-notes.edit', this.controller.sortedNotes[0].id);
        }
    }

    renderTemplate(controller) {
        this.render('notes', {
            controller
        })
    }

    @action
    willTransition(transition) {
        if (transition.targetName === 'collection-notes.index' && this.controller.viewMode.isEditorOpen && this.media.isDesktop) {
            this.router.transitionTo('collection-notes.edit', this.controllerFor('notes').sortedNotes[0].id);
        }
    }

    @action
    reload() {
        this.refresh();
    }
}
