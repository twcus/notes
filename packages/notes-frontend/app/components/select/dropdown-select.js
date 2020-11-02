import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DropdownSelectComponent extends Component {
    @tracked isOpen;

    @action
    open() {
        this.isOpen = true;
        if (this.args.onOpen) {
            this.args.onOpen();
        }
    }

    @action
    close() {
        this.isOpen = false;
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
    select(dropdown, item) {
        this.args.onSelect(item);
        if (this.args.closeOnSelect) {
            dropdown.actions.close();
        }
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
