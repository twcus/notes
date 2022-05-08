import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service session;
    @service router;

    async beforeModel() {
        await this.session.setup();
        this.router.transitionTo('notes');
    }
}
