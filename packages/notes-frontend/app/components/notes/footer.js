import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';

export default class NotesFooterComponent extends Component {
    tagSortKey = ['content:asc'];

    @sort('args.note.tags', 'tagSortKey') sortedTags;
}
