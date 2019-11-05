import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route('notes', function() {
        this.route('new');
        this.route('edit', { path: '/:id' });
    });
    this.route('collections', function() {
        this.route('new');
        this.route('edit', { path: '/:id' });
    });
    this.route('tags');
    this.route('trash');
});

export default Router;