import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NoteCardComponent extends Component {
    @service('active-note') activeNote;

    @tracked isActive = false;

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
