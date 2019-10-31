import PowerSelectTrigger from 'ember-power-select/components/power-select-multiple/trigger';
import { action, set } from '@ember/object';

export default class SelectTriggerComponent extends PowerSelectTrigger {
    @action
    clearSearchText() {
        set(this, 'select.searchText', '');
        this.select.actions.search('');
    }

    @action
    handleKeydown(e) {
        // Overriding this to prevent the backspace key from filling in the input with text from selected tags
        if (this.onKeydown && this.onKeydown(e) === false) {
            e.stopPropagation();
            return false;
        }
        if (e.keyCode === 8 || (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32)) {
            e.stopPropagation();
        }
    }

}
