import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ToolbarSearchComponent extends Component {
    @service media;

    @tracked isSearchOpen

    @action
    openSearch() {
        this.isSearchOpen = true;
        // Make sure it has time to open before trying to focus the input
        later(() => {
            document.querySelector('.toolbar-search').focus();
        }, 25);
    }

    @action
    closeSearch() {
        this.isSearchOpen = false;
    }

    @action
    searchQueryUpdated() {
        if (this.args.searchQueryUpdated) {
            this.args.searchQueryUpdated();
        }
    }
}
