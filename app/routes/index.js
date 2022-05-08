import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service session;

    async beforeModel() {
        await this.session.setup();
        this.transitionTo('notes');
    }
}
