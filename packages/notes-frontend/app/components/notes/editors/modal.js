import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// TODO move constants to own file to import
const ESCAPE_CODE = 27;

export default class NotesEditorsModalComponent extends Component {
    @tracked isConfirmingDelete = false;

    @action
    close() {
        this.args.onClose();
    }

    @action
    handleKeydown(event) {
        if (event.keyCode === ESCAPE_CODE) {
            this.args.onClose();
        }
    }

    @action
    updatedNote(content) {
        this.args.note.content = content;
        this.args.onNoteUpdate(this.args.note);
    }

    @action
    async delete() {
        await this.args.onDelete(this.args.note);
    }

    @action
    selectTag(tag) {
        let noteTags = this.args.note.tags;
        noteTags.includes(tag) ? noteTags.removeObject(tag) : noteTags.pushObject(tag);
        this.args.onNoteUpdate(this.args.note);
    }

    @action
    createTag(content) {
        this.args.onTagCreate(content, this.args.note);
    }

    @action
    removeTagFromNote(tag) {
        this.args.onTagRemove(tag, this.args.note);
    }

    @action
    customSuggestion(term) {
        return term;
    }

    @action
    onDeleteOpen(note) {
        this.isConfirmingDelete = true;
        this.noteForDeletion = note;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.args.onDelete(this.args.note);
        }
    }
}
