import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NoteCardComponent extends Component {
    @tracked tags = [ {content: 'one'}, {content: 'two'}, {content: 'three'}, {content: 'four'}, {content: 'five'}];
    @tracked selectedTags = [];
    @tracked isActive = false;

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

    @action
    selectTag(tag) {
        console.log('in selectTag' + ` ${tag}`);
    }

    @action
    createTag(tag) {
        console.log(`in createTag ${tag}`);
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

    @action
    preventClose() {
        // Don't allow ember-power-select to be closed inside the ember-basic-dropdown
        return false;
    }
}
