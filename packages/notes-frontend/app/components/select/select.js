import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
    @tracked searchText = '';

    get allOptions() {
        return this.args.options || [];
    }

    get options() {
        if (!this.args.searchEnabled || !this.searchText) {
            return this.allOptions;
        }

        const searchFields = this.args.searchFields;
        let searchResults;
        if (this.args.searchFields) {
            searchResults = this.allOptions.filter(o => searchFields.any(f => (o[f].toString() || '').includes(this.searchText)));
        } else {
            searchResults = this.allOptions.filter(o => o.toString().includes(this.searchText));
        }
        return searchResults;
    }

    get isMultiselect() {
        return this.args.isMultiselect || false;
    }

    get showNoOptionsMessage() {
        return this.args.noOptionsMessage && !this.options.length && !this.searchText;
    }

    get showNoSearchResultsMessage() {
        return this.args.searchEnabled && !this.options.length && !this.args.createEnabled;
    }

    get showCreateOption() {
        // TODO Should be able to pass custom function in here, it doesn't really make any sense to compare to the fields like this
        return this.args.createEnabled &&
            this.searchText &&
            !this.options.any(o => this.args.searchFields.any(f => (o[f].toString() || '') === this.searchText));
    }

    @action
    onChange(option) {
        this.args.onChange(option);
        if (this.args.clearSearchOnChange) {
            this.searchText = '';
        }
    }

    @action
    onCreate() {
        this.args.onCreate(this.searchText);
        if (this.args.clearSearchOnCreate) {
            this.searchText = '';
        }
    }
}
