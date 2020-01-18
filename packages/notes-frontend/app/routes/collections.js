import Route from '@ember/routing/route';

export default class CollectionsRoute extends Route {
    model() {
        return this.store.findAll('collection');
    }
}
