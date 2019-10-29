import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NoteCardGridComponent extends Component {
    @action
    deleteNote(note) {
        return this.args.onDeleteNote(note);
    }
}
