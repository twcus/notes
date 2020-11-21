import Component from '@glimmer/component';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class NotesModesListComponent extends Component {
    @service media;

    get editRoute() {
        return isNone(this.args.collection) ? 'notes.edit' : 'collection-notes.edit';
    }
}
