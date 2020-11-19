import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * Provides utility functions for authentication and authorization. TODO Look into extending session service from ember-simple-auth
 */
export default class AuthService extends Service {
    @service session;
    @service router;
    @service notifications;

    @action
    logout() {
        this.session.invalidate();
        this.router.transitionTo('login');
        this.notifications.clearAll().success('You have logged out.');
    }
}
