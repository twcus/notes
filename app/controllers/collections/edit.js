import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CollectionsEditController extends Controller {
    @service notifications;
    @service modal;

    @tracked selectedTags = [];

    @action
    onClose() {
        this.transitionToRoute('collections');
    }

    @action
    onSave() {
        let collectionValidation = this.model.collection.validate(this.model.collections.without(this.model.collection));
        if (collectionValidation.status) {
            return this.model.collection.save()
                .then(() => {
                    this.notifications.clearAll().success(`Collection "${this.model.collection.name}" was saved.`);
                    this.transitionToRoute('collections')
                })
                .catch(res => {
                    this.notifications.clearAll().error(res);
                });
        } else {
            this.notifications.clearAll().error(collectionValidation.message);
        }
    }

    @action
    selectTag(tag) {
        let collectionTags = this.model.collection.tags;
        collectionTags.includes(tag) ? collectionTags.removeObject(tag) : collectionTags.pushObject(tag);    }

    @action
    createTag(content) {
        let tag = this.store.createRecord('tag', {
            content,
            collections: [this.model.collection]
        });
        tag.save();
    }

    @action
    onTagRemove(tag) {
        this.model.collection.tags.removeObject(tag);
    }
}
