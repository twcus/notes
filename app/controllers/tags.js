import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TagsController extends Controller {
    @service notifications;
    @service media;
    @service auth;
    @service navigation;
    @tracked searchQuery;
    @tracked isConfirmingDelete;
    @tracked tagForDeletion;

    get searchedTags() {
        if (this.searchQuery) {
            return this.model.filter(tag => tag.content.includes(this.searchQuery));
        }
        return this.model;
    }

    @action
    onDeleteOpen(tag) {
        this.isConfirmingDelete = true;
        this.tagForDeletion = tag;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.tagForDeletion.destroyRecord()
                .then(() => this.notifications.clearAll().success(`Tag "${this.tagForDeletion.content}" was deleted.`))
                .catch(res => this.notifications.clearAll().error(res));

        }
        this.tagForDeletion = null;
    }

    @action
    onEdit(tag) {
        this.transitionToRoute('tags.edit', tag.id);
    }
}
