import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class CollectionsController extends Controller {
    tagSortKey = ['content:asc'];

    @service notifications;
    @service media;
    @service navigation;
    @service auth;
    @tracked searchQuery;
    @tracked tagFilters;
    @tracked isConfirmingDelete = false;
    @tracked collectionForDeletion;
    @sort('model.tags', 'tagSortKey') sortedTags;

    get filteredCollections() {
        if (this.tagFilters) {
            return this.model.collections.filter(collection => this.tagFilters.every(tag => collection.tags.includes(tag)));
        }
        return this.model.collections;
    }

    get searchedCollections() {
        if (this.searchQuery) {
            return this.filteredCollections.filter(collection => collection.searchString.includes(this.searchQuery.toLowerCase()))
        }
        return this.filteredCollections;
    }

    @action
    updateTagFilters(tag) {
        this.tagFilters.includes(tag) ? this.tagFilters.removeObject(tag) : this.tagFilters.pushObject(tag);
    }

    @action
    removeFilteredTag(tag) {
        this.tagFilters.removeObject(tag);
    }

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
