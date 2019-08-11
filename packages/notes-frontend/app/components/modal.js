import Component from '@ember/component';

export default Component.extend({
    focusedElement: null,
    didInsertElement() {
        if (this.get('focusedElement')) {
            let element = this.get('element').querySelector(this.get('focusedElement'));
            element.focus();
            element.setSelectionRange(0, 0);
        }
    },
    actions: {
        clickOverlay() {
            this.onClickOverlay();
        }
    }
});
