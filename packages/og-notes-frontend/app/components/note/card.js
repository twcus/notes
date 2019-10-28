import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NoteCardComponent extends Component {
    @tracked isConfirmingDelete = false;

    @action
    handleMouseLeave() {
        console.log('in handleMouseLeave');
        this.isConfirmingDelete = false;
    }

    @action
    showDeleteConfirm() {
        console.log('in showDeleteConfirm()');
        this.isConfirmingDelete = true;
    }

    @action
    deleteConfirm() {
        console.log('in deleteConfirm()');
        console.log(this.args.note.modifiedDate);
        this.isConfirmingDelete = false;
    }

    @action
    deleteCancel() {
        console.log('in deleteCancel()');
        this.isConfirmingDelete = false;
    }

    @action
    showTagSelector() {
        console.log('in showTagSelector()');
    }
}
