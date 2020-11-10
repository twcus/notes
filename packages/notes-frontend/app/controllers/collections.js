import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CollectionsController extends Controller {
    @service notifications;
    @tracked isConfirmingDelete = false;
    @tracked collectionForDeletion;

    @action
    onDeleteOpen(collection) {
        this.isConfirmingDelete = true;
        this.collectionForDeletion = collection;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.collectionForDeletion.destroyRecord()
                .then(() => this.notifications.clearAll().success(`Collection "${this.collectionForDeletion.name}" was deleted.`))
                .catch(res => this.notifications.clearAll().error(res));
        }
        this.collectionForDeletion = null;
    }

    @action
    onEdit(collection) {
        this.transitionToRoute('collections.edit', collection.id);
    }
}
