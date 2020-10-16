import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CollectionsNewController extends Controller {
    @tracked errorMessage;
    @tracked selectedTags = [];

    @action
    onClose() {
        this.transitionToRoute('collections');
    }

    @action
    onSave() {
        let collectionValidation = this.model.collection.validate(this.model.collections.without(this.model.collection))
        if (collectionValidation.status) {
            this.errorMessage = null;
            return this.model.collection.save()
                .then(() => {
                    this.transitionToRoute('collections')
                })
                .catch(res => {
                    this.errorMessage = res;
                });
        } else {
            this.errorMessage = collectionValidation.message;
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
