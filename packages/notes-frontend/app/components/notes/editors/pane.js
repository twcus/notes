import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NotesEditorsPaneComponent extends Component {
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
    async delete() {
        await this.args.onDelete(this.args.note);
    }

    @action
    selectTag(tags) {
        this.args.note.tags = tags;
        this.args.onNoteUpdate(this.args.note);
    }

    @action
    createTag(content, select) {
        this.args.onTagCreate(content, this.args.note);
        select.actions.search(''); // Clear the search input after creating tag
    }

    @action
    removeTagFromNote(tag) {
        this.args.onTagRemove(tag, this.args.note);
    }

    @action
    customSuggestion(term) {
        return term;
    }
}
