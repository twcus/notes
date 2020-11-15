import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UtilsSortSelectComponent extends Component {
    sortOrderOptions = [
        {
            name: 'Ascending',
            order: 'asc',
            icon: 'arrow-up'
        },
        {
            name : 'Descending',
            order: 'desc',
            icon: 'arrow-down'
        }
    ];

    @tracked selectedSortOrder = this.sortOrderOptions.findBy('order', this.args.defaultSortOrder);

    @action
    selectSortOrder(order) {
        this.selectedSortOrder = order;
        this.args.onSelectSortOrder(order);
    }
}
