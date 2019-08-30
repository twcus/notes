import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ['tag-table'],
    page: 0,
    limit: 10,
    dir: 'asc',
    sort: 'content',
    columns: computed(function() {
        return [{
            name: 'Tag',
            valuePath: 'content',
            textAlign: 'left',
            class: 'tag-column',
        }, {
            name: 'Notes',
            valuePath: 'notes.length',
            textAlign: 'right',
            class: 'num-notes-column'
        }, {
            name: 'Collections',
            valuePath: 'collections.length',
            textAlign: 'right',
            class: 'num-collections-column'
        }, {
            name: 'Actions',
            textAlign: 'right',
            class: 'tag-actions-column',
            isActions: true
        }];
    }),
    rows: computed('tags', function() {
        return this.get('tags').toArray();
    })
});
