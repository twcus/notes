import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class CollectionsController extends Controller {
    tagSortKey = ['content:asc'];

    @service router;
    @service notifications;
    @service media;
    @service navigation;
    @service auth;
    @tracked searchQuery;
    @tracked tagFilters;
    @tracked collectionForDeletion;
    @tracked collectionForTagSelection;
    @tracked isConfirmingDelete = false;
    @tracked isSelectingTags = false;
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
    clearSearch() {
        this.searchQuery = null;
    }

    @action
    transitionToNewCollection() {
        this.router.transitionTo('collections.new');
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
    deselectFilters() {
        this.tagFilters = [];
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
    onTagSelectorOpen() {
        this.isSelectingTags = true;
    }

    @action onTagSelectorClose() {
        this.isSelectingTags = false;
    }

    @action
    onEdit(collection) {
        this.router.transitionTo('collections.edit', collection.id);
    }
}
