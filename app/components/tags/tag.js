import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class TagComponent extends Component {
    isEscaping = false;
    @tracked isEditing = false;

    get inputId() {
        return guidFor(this);
    }

    get inputElement() {
        return document.getElementById(this.inputId);
    }

    disableEditing() {
        this.isEditing = false;
        this.inputElement.disabled = true;
    }

    undoChanges() {
        this.args.tag.rollbackAttributes();
        this.disableEditing();
    }

    @action
    edit() {
        this.isEditing = true;
        // Must manually set the disabled attribute to ensure these operations happen synchronously
        this.inputElement.disabled = false;
        this.inputElement.focus();
    }

    @action
    save() {
        if (!this.isEscaping) {
            // Do not save if this action was triggered by pressing the escape key
            this.disableEditing();
            this.args.onSave(this.args.tag);
        } else {
            this.isEscaping = false;
        }
    }

    @action
    delete() {
        this.args.onDelete(this.args.tag);
    }

    @action
    remove() {
        this.args.onRemove(this.args.tag);
    }
}
