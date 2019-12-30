import Component from '@glimmer/component';

export default class TagTableComponent extends Component {
    columns = [{
        name: 'Tag',
        valuePath: 'content',
        textAlign: 'left',
        class: 'column tag-name',
    }, {
        name: 'Notes',
        valuePath: 'notes.length',
        textAlign: 'right',
        class: 'column num-notes'
    }, {
        name: 'Collections',
        valuePath: 'collections.length',
        textAlign: 'right',
        class: 'column num-collections'
    }, {
        name: 'Actions',
        textAlign: 'right',
        class: 'column actions is-last-column',
    }];

    rows = this.args.tags.toArray();
}
