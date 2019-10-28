import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NoteCardComponent extends Component {
    isConfirmingDelete = false;

    @action
    showDeleteConfirmation() {
        console.log('in showDeleteConfirmation in card');
        this.isConfirmingDelete = true;
    }

    @action
    cancelDelete() {
        console.log('in cancelDelete in card');
        this.isConfirmingDelete = false;
    }

    @action
    confirmDelete() {
        console.log('in confirmDelete in card');
        this.isConfirmingDelete = false;
    }
}
