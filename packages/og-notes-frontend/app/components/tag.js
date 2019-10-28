import Component from '@ember/component';

export default Component.extend({
    tagName: 'button',
    classNames: ['tag', 'is-grey'],
    hasActionButton: true,
    actionButtonIcon: 'times'
});
