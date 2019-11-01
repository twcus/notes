import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DropdownSelectComponent extends Component {
    @action
    open() {
        this.args.onOpen();
    }

    @action
    close() {
        this.args.onClose();
    }

    @action
    customSuggestion(term) {
        return term;
    }

    @action
    select(item) {
        this.args.onSelect(item);
    }

    @action
    create(item, select) {
        this.args.onCreate(item, select);
    }

    @action
    preventSelectClose() {
        // Prevent ember-power-select from being closed inside the dropdown
        return false;
    }
}
