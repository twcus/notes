import Controller from '@ember/controller';
import CollectionActionsMixin from '../mixins/collection-actions-mixin';
import TagActionsMixin from '../mixins/tag-actions-mixin';
import ViewMixin from '../mixins/view-mixin';

export default Controller.extend(CollectionActionsMixin, TagActionsMixin, ViewMixin, {
    actions: {
        searchCollections(searchText) {
            console.log(searchText);
        },
        filterCollections(filter) {
            console.log(filter);
        },
        sortCollections(sort) {
            console.log(sort);
        }
    }
});
