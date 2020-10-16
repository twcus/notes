import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CollectionsNewController extends Controller {
    @tracked errorMessage;
    @tracked selectedTags = [];

    validate() {
        if (!this.model.collection.name) {
            this.errorMessage = 'Please enter a name for this collection.';
        } else if (this.model.collections.without(this.model.collection)
            .any(c => c.name === this.model.collection.name)) {
            this.errorMessage = `Collection "${this.model.collection.name}" already exists.`;
        } else if (!this.model.collection.tags.length) {
            this.errorMessage = 'Please select tags for this collection.';
        } else {
            this.errorMessage = null;
        }
        return !this.errorMessage;
    }

    @action
    onClose() {
        this.transitionToRoute('collections');
    }

    @action
    onSave() {
        if (this.validate()) {
            return this.model.collection.save()
                .then(() => {
                    this.transitionToRoute('collections')
                })
                .catch(res => {
                    this.errorMessage = res;
                });
        }
    }

    @action
    selectTag(tags) {
        this.model.collection.tags = tags;
    }

    @action
    createTag(content, select) {
        let tag = this.store.createRecord('tag', {
            content,
            collections: [this.model.collection]
        });
        tag.save();
        select.actions.search('');
    }
}
