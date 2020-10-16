import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagsEditController extends Controller {
    @tracked errorMessage;

    @action
    onClose() {
        this.transitionToRoute('tags');
    }

    @action
    onSave() {
        let tagValidation = this.model.tag.validate(this.model.tags.without(this.model.tag));
        if (tagValidation.status) {
            this.errorMessage = null;
            return this.model.tag.save()
                .then(() => {
                    this.transitionToRoute('tags');
                })
                .catch(res => {
                    this.errorMessage = res;
                });
        } else {
            this.errorMessage = tagValidation.message;
        }
    }
}
