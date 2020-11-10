import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class TagsNewRoute extends Route {
    model() {
        return RSVP.hash({
            tag: this.store.createRecord('tag'),
            tags: this.modelFor('tags')
        });
    }

    @action
    willTransition() {
        let tag = this.controller.model.tag;
        if (tag.isNew) {
            tag.destroyRecord();
        }
    }
}
