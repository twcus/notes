import Component from '@ember/component';

export default Component.extend({
    classNames: ['tag-selector'],
    optionsPromise: null,
    init() {
        this._super(...arguments);
        let promise = this.getAllTags();
        this.set('optionsPromise', promise);
    },
    actions: {
        createTag(content) {
            console.log(`creating new tag ${content}`);
            this.createTag(content);
        },
        selectedTag(selected) {
            this.onSelectTag(selected);
        },
        onTagListClose() {
            return false;
        },
        createTagSuggestion(tag) {
            return `Create tag ${tag}`;
        }
    }
});
