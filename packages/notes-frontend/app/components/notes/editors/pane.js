import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NotesEditorsPaneComponent extends Component {
    @tracked isConfirmingDelete = false;

    @action
    close() {
        this.args.onClose();
    }

    @action
    updatedNote(content) {
        this.args.note.content = content;
        this.args.onNoteUpdate(this.args.note);
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
    onDeleteOpen() {
        this.isConfirmingDelete = true;
    }

    @action
    onDeleteClose(shouldDelete) {
        this.isConfirmingDelete = false;
        if (shouldDelete) {
            return this.args.onDelete(this.args.note);
        }
    }
}
