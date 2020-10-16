import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isNone } from '@ember/utils';

export default class NoteCardComponent extends Component {
    @tracked isActive = false;

    get editRoute() {
        return isNone(this.args.collection) ? 'notes.edit' : 'collection-notes.edit';
    }

    get editModels() {
        let noteId = this.args.note.id;
        return isNone(this.args.collection) ? [noteId] : [this.args.collection.id, noteId];
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
    customSuggestion(term) {
        return term;
    }

    @action
    onTagSelectorOpen() {
        this.isActive = true;
    }

    @action
    onTagSelectorClose() {
        this.isActive = false;
    }
}
