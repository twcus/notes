import Component from '@glimmer/component';
import { isNone } from '@ember/utils';

export default class NotesModesListComponent extends Component {
    get editRoute() {
        return isNone(this.args.collection) ? 'notes.edit' : 'collection-notes.edit';
    }
}
