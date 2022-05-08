import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
    @service session;
    @service router;

    beforeModel(transition) {
        if (this.session.isAuthenticated) {
            this.router.transitionTo('index');
        }
    }
}
