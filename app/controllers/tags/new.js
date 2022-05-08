import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TagsNewController extends Controller {
    @service router;
    @service notifications;
    @service modal;

    @action
    onClose() {
        this.router.transitionTo('tags');
    }

    @action
    onSave() {
        let tagValidation = this.model.tag.validate(this.model.tags.without(this.model.tag));
        if (tagValidation.status) {
            return this.model.tag.save()
                .then(() => {
                    this.notifications.clearAll().success(`Collection "${this.model.tag.content}" was saved.`);
                    this.router.transitionTo('tags');
                })
                .catch(res => {
                    this.notifications.clearAll().error(res);
                });
        } else {
            this.notifications.clearAll().error(tagValidation.message);
        }
    }

    @action
    selectTag(tags) {
        this.model.tag.tags = tags;
    }

    @action
    createTag(content, select) {
        let tag = this.store.createRecord('tag', {
            content,
            tags: [this.model.tag]
        });
        tag.save();
        select.actions.search('');
    }
}
