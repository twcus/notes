import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ActiveNoteService extends Service {
    @tracked note = null;

    setActiveNote(note) {
        debugger;
        this.note = note;
    }
}
