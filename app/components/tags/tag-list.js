import Component from '@glimmer/component';

export default class TagListComponent extends Component {
    get maxVisibleTags() {
        return this.args.maxVisibleTags || this.collectionTags.length + this.noteTags.length;
    }

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
        return this.collectionTags.slice(0, this.maxVisibleTags);
    }

    get visibleNoteTags() {
        const visibleCollectionTagsLength = this.visibleCollectionTags.length;
        if (visibleCollectionTagsLength >= this.maxVisibleTags) {
            return [];
        }
        return this.noteTags.slice(0, this.maxVisibleTags - visibleCollectionTagsLength);
    }

    get numExcessTags() {
        return (this.collectionTags.length - this.visibleCollectionTags.length) +
            (this.noteTags.length - this.visibleNoteTags.length);
    }
}
