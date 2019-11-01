import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NoteEditorModalComponent extends Component {
    @action
    close() {
        this.args.onClose();
    }
}
