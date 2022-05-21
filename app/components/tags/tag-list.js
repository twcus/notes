import Component from '@glimmer/component';

const MAX_VISIBLE_TAGS = 4;

export default class TagListComponent extends Component {
    get collectionTags() {
        return this.args.collectionTags || [];
    }

    get noteTags() {
        let noteTags = this.args.tags || [];
        noteTags = noteTags.filter(tag => !this.collectionTags.includes(tag));
        return noteTags;
    }

    get noteCollectionTags() {
        return this.args.collectionTags || [];
    }

    get visibleCollectionTags() {
        return this.collectionTags.slice(0, MAX_VISIBLE_TAGS);
    }

    get visibleNoteTags() {
        const visibleCollectionTagsLength = this.visibleCollectionTags.length;
        if (visibleCollectionTagsLength >= 4) {
            return [];
        }
        return this.noteTags.slice(visibleCollectionTagsLength, MAX_VISIBLE_TAGS);
    }

    get numExcessTags() {
        return (this.collectionTags.length - this.visibleCollectionTags.length) +
            (this.noteTags.length - this.visibleNoteTags.length);
    }
}
