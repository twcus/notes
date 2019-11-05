import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

/**
 * This service is used to track the active note while on the notes/new route, it was the easiest (though maybe not the ideal)
 * way to hide the note on the grid after it had been saved.
 */
export default class ActiveNoteService extends Service {
    @tracked note = null;

    setActiveNote(note) {
        this.note = note;
    }
}
