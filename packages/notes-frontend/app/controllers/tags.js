import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagsController extends Controller {
    @tracked isConfirmingDelete;
    @tracked tagForDeletion;

    @action
    onDeleteOpen(tag) {
        this.isConfirmingDelete = true;
        this.tagForDeletion = tag;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.tagForDeletion.destroyRecord();
        }
        this.tagForDeletion = null;
    }

    @action
    onEdit(tag) {
        this.transitionToRoute('tags.edit', tag.id);
    }
}
