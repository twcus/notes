import { set } from '@ember/object';
import PowerSelectCreate from 'ember-power-select-with-create/components/power-select-multiple-with-create';

export default PowerSelectCreate.extend({
    selectOrCreate(selection, select) {
        debugger;
        let suggestion = selection.filter((option) => {
            return option.__isSuggestion__;
        })[0];

        if (suggestion) {
            this.get('oncreate')(suggestion.__value__, select);
        } else {
            this.get('onchange')(selection, select);
            set(select, 'searchText', '');
        }
    }
});
