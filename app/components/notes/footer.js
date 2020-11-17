import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';

export default class NotesFooterComponent extends Component {
    tagSortKey = ['content:asc'];

    @sort('tags', 'tagSortKey') sortedTags;

    get tags() {
        if (this.args.collectionTags) {
            return this.args.note.tags.reject(t => this.args.collectionTags.includes(t));
        }
        return this.args.note.tags;
    }

    get tagOptions() {
        if (this.args.collectionTags) {
            return this.args.tags.reject(t => this.args.collectionTags.includes(t));
        }
        return this.args.tags;
    }
}
