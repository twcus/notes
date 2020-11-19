import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
    @service session;
    @service auth;
    @service notifications;
    @service media;
    @service navigation;
}
