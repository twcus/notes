import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';

export default class NotesFooterComponent extends Component {
    tagSortKey = ['content:asc'];

    @sort('filteredTags', 'tagSortKey') sortedTags;

    get filteredTags() {
        return this.args.note.tags.reject(t => this.args.collectionTags.includes(t));
    }
}
