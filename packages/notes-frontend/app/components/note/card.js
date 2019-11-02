import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NoteCardComponent extends Component {
    @tracked tags = [ {content: 'onasdfasdfasdfasdfsdfasdfsdgfafasdfe'}, {content: 'two'}, {content: 'three'}, {content: 'four'}, {content: 'five'}, {content: 'two'}, {content: 'three'}, {content: 'four'}, {content: 'five'}];
    @tracked selectedTags = [];
    @tracked isActive = false;
    @tracked isEditing = false;

    @action
    async delete() {
        let result = await this.args.onDelete(this.args.note);
        console.log(result);
    }

    @action
    selectTag(tag) {
        this.selectedTags = tag;
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

    @action
    onTagSelectorOpen() {
        console.log('in onTagSelectorOpen');
        this.isActive = true;
    }

    @action
    onTagSelectorClose() {
        console.log('in onTagSelectorClose');
        this.isActive = false;
    }
}
