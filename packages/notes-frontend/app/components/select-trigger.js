import PowerSelectTrigger from 'ember-power-select/components/power-select-multiple/trigger';
import { action, set } from '@ember/object';

export default class SelectTriggerComponent extends PowerSelectTrigger {
    @action
    clearSearchText() {
        // set(this, 'select.searchText', '');
    }
}
