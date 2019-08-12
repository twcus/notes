import Controller from '@ember/controller';
import CollectionActionsMixin from '../mixins/collection-actions-mixin';
import ViewMixin from '../mixins/view-mixin';

export default Controller.extend(CollectionActionsMixin, ViewMixin, {
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
