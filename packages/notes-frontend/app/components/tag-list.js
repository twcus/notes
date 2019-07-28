import Component from '@ember/component';

export default Component.extend({
    classNames: ['tag-selector'],
    optionsPromise: null,
    init() {
        this._super(...arguments);
        let promise = this.getAllTags()
            .then(tags => {
                this.set('allTags', tags);
                return tags;
            });
        this.set('optionsPromise', promise);
    },
    actions: {
        createTag(content) {
            console.log(`creating new tag ${content}`);
            this.createTag(content);
        },
        selectedTag(selected, select) {
            debugger;
            console.log(selected);
            console.log(`selected ${JSON.stringify(selected)}`);
            this.onSelectTag(selected);
        },
        onTagListClose() {
            return false;
        },
        createTagSuggestion(tag) {
            return `Create tag ${tag}`;
        },
        shouldShowCreateOption(searchText) {
            return !this.get('allTags').findBy('content', searchText);
        }
    }
});
