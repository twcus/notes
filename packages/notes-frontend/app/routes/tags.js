import Route from '@ember/routing/route';

export default class TagsRoute extends Route {
    model() {
        return this.store.findAll('tag');
    }
}
