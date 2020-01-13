import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DropdownSelectComponent extends Component {
    @action
    open() {
        if (this.args.onOpen) {
            this.args.onOpen();
        }
    }

    @action
    close() {
        if (this.args.onClose) {
            this.args.onClose();
        }
    }

    @action
    closeDropdown(dropdown) {
        dropdown.actions.close();
    }

    @action
    customSuggestion(term) {
        return term;
    }

    @action
    showCreateOption(term) {
        // Don't show the create option if there is an exact match for the search term
        return !this.args.showCreateOption && !this.args.options.find(({ content }) => content === term);
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
