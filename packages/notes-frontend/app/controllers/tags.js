import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TagsController extends Controller {
    @action
    saveTag(tag) {
        return tag.save();
    }

    @action
    deleteTag(tag) {
        return tag.destroyRecord();
    }
}
