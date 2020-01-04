import { layout, tagName } from "@ember-decorators/component";
import Component from '@ember/component';
import { action } from '@ember/object';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import templateLayout from '../templates/components/power-select-trigger';

const ua = window && window.navigator ? window.navigator.userAgent : '';
const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

export default @tagName('') @layout(templateLayout) class PowerSelect::SelectTrigger extends Component {
    @service textMeasurer
    _lastIsOpen = false

    // Lifecycle hooks
    didReceiveAttrs() {
        let oldSelect = this.oldSelect || {};
        this.set('oldSelect', this.select);
        if (oldSelect.isOpen && !this.select.isOpen) {
            scheduleOnce('actions', null, this.select.actions.search, '');
        }
    }

    // Actions
    @action
    storeInputStyles(input) {
        let { fontStyle, fontVariant, fontWeight, fontSize, lineHeight, fontFamily } = window.getComputedStyle(input);
        this.inputFont = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
    }

    @action
    chooseOption(e) {
        let selectedIndex = e.target.getAttribute('data-selected-index');
        if (selectedIndex) {
            e.stopPropagation();
            e.preventDefault();
            let object = this.selectedObject(this.select.selected, selectedIndex);
            this.select.actions.choose(object);
        }
    }

    @action
    handleInput(e) {
        if (this.onInput && this.onInput(e) === false) {
            return;
        }
        this.select.actions.open(e);
    }

    @action
    handleKeydown(e) {
        if (this.onKeydown && this.onKeydown(e) === false) {
            e.stopPropagation();
            return false;
        }
        if (e.keyCode === 8 || (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32)) {
            e.stopPropagation();
        }
    }

    selectedObject(list, index) {
        if (list.objectAt) {
            return list.objectAt(index);
        } else {
            return get(list, index);
        }
    }
}
