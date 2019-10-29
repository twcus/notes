import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NoteCardComponent extends Component {
    @action
    async delete(note) {
        console.log('in delete in card' + `${JSON.stringify(note)}`);
        let result = await this.args.onDelete(note);
        console.log(`${result}`);
    }

    @action
    openTagSelector() {
        console.log('in openTagSelector in card');
    }
}
