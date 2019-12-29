import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NoteEditorModalComponent extends Component {
    @action
    focusElement(element) {
        element.focus();
    }

    @action
    close() {
        this.args.onClose();
    }

    @action
    updatedNote() {
        this.args.onUpdate(this.args.note);
    }

    @action
    async delete() {
        let result = await this.args.onDelete(this.args.note);
        console.log(result);
    }

    @action
    selectTag(tags) {
        this.args.note.tags = tags;
        this.args.onUpdate(this.args.note);
    }

    @action
    createTag(tag, select) {
        let newTag = {content: tag};
        this.selectedTags.push(newTag);
        this.selectedTags = this.selectedTags;
        this.tags.push(newTag);
        this.tags = this.tags;
        select.actions.search(''); // Clear the search input after creating tag
        console.log(`in createTag ${tag}`);
    }

    @action
    customSuggestion(term) {
        return term;
    }
}
