import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";


export default class ApplicationController extends Controller {
    @service session;
    @service notifications;
    @tracked navSubtitle;

    @action
    logout() {
        console.log('invalidated!')
        this.session.invalidate();
        this.transitionToRoute('login');
        this.notifications.clearAll().success('You have logged out.');
    }
}
