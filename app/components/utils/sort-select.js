import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UtilsSortSelectComponent extends Component {
    sortOrderOptions = [
        {
            order: 'asc',
            icon: 'arrow-up'
        },
        {
            order: 'desc',
            icon: 'arrow-down'
        }
    ];

    @tracked selectedSortOption = this.sortOptions.find(option => option.property === this.args.defaultSortProperty && this.args.defaultSortOrder);

    get sortOptions() {
        const sortProperties = this.args.sortPropertyOptions || [];
        return sortProperties.reduce((agg, property) => agg.concat(this.sortOrderOptions.map(order => ({ ...order, ...property }))), [])
    }

    @action
    selectSortOption(selectedOption) {
        this.selectedSortOption = selectedOption;
        this.args.onSelectSort(selectedOption);
    }
}
