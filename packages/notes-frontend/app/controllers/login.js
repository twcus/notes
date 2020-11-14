import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class LoginController extends Controller {
    @service session;
    @service notifications;

    @tracked username;
    @tracked password;

    @action
    async authenticate() {
        if (!this.username || !this.password) {
            this.notifications.clearAll().error('Username and password are required.');
            return;
        }
        try {
            await this.session.authenticate('authenticator:jwt', { username: this.username, password: this.password });
            this.username = this.password = null;
            this.notifications.clearAll();
            this.transitionToRoute('notes');
        } catch(error) {
            this.notifications.clearAll().error(error.text);
        }
    }
}
