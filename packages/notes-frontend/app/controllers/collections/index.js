import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CollectionsIndexController extends Controller {
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
            return this.collectionForDeletion.destroyRecord();
        }
        this.collectionForDeletion = null;
    }

    @action
    onEdit(collection) {
        this.transitionToRoute('collections.edit', collection.id);
    }
}
