import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TagDropdownComponent extends Component {
    @tracked tags = [
        { content: 'first' },
        { content: 'second' }
    ];

    @tracked selectedTag = null;

    @action
    selectTag() {
        console.log('selectedTag');
    }

    @action
    createTag() {
        console.log('createdTag');
    }
}
