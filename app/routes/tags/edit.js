import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class TagsEditRoute extends Route {
    model(params) {
        return RSVP.hash({
            tag: this.store.findRecord('tag', params.tag_id),
            tags: this.modelFor('tags')
        });
    }

    @action
    willTransition() {
        let tag = this.controller.model.tag;
        if (tag.hasDirtyAttributes) {
            tag.rollbackAttributes();
        }
    }
}
