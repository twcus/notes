import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class TagsEditController extends Controller {
    @service router;
    @service notifications;
    @service modal;

    @tracked isDeleting = false;

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
    onDelete() {
        const tagContent = this.model.tag.content;
        return this.model.tag.destroyRecord()
            .then(() => {
                this.notifications.clearAll().success(`Tag "${tagContent} was deleted.`);
                this.router.transitionTo('tags');
            })
            .catch(() => {
                this.notifications.clearAll().error('Failed to delete tag.');
            });
    }

    @action
    onDeleteOpen() {
        this.isDeleting = true;
    }

    @action
    onDeleteCancel() {
        this.isDeleting = false;
    }
}
