import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagsNewController extends Controller {
    @tracked errorMessage;

    validate() {
        if (!this.model.tag.content) {
            this.errorMessage = `Please enter tag text.`
        } else if (this.model.tags.without(this.model.tag).any(t => t.content === this.model.tag.content)) {
           this.errorMessage = `Tag "${this.model.tag.content}" already exists.`
        } else {
            this.errorMessage = null;
        }
        return !this.errorMessage;
    }

    @action
    onClose() {
        this.transitionToRoute('tags');
    }

    @action
    onSave() {
        if (this.validate()) {
            return this.model.tag.save()
                .then(() => {
                    this.transitionToRoute('tags');
                })
                .catch(res => {
                    this.errorMessage = res;
                });
        }
    }

    @action
    selectTag(tags) {
        this.model.tag.tags = tags;
    }

    @action
    createTag(content, select) {
        let tag = this.store.createRecord('tag', {
            content,
            tags: [this.model.tag]
        });
        tag.save();
        select.actions.search('');
    }
}
