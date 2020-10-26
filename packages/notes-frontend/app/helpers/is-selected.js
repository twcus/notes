import { helper } from '@ember/component/helper';
import { isEqual } from '@ember/utils';

export default helper(function isSelected(params) {
    const [isMultiselect, selected, option] = params;
    return isMultiselect ? selected.includes(option) : isEqual(selected, option)
});
