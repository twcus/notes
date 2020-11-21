import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TagsEditController extends Controller {
    @service notifications;
    @service modal;

    @action
    onClose() {
        this.transitionToRoute('tags');
    }

    @action
    onSave() {
        let tagValidation = this.model.tag.validate(this.model.tags.without(this.model.tag));
        if (tagValidation.status) {
            return this.model.tag.save()
                .then(() => {
                    this.notifications.clearAll().success(`Collection "${this.model.tag.content}" was saved.`);
                    this.transitionToRoute('tags');
                })
                .catch(res => {
                    this.notifications.clearAll().error(res);
                });
        } else {
            this.notifications.clearAll().error(tagValidation.message);
        }
    }
}
