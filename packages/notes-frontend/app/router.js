import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function() {
    this.route('notes', function() {
        this.route('new');
        this.route('edit', { path: '/:note_id' });
    });
    this.route('tags');
    this.route('collections', function() {
        this.route('edit', { path: '/:collection_id' });
        this.route('new');
        this.route('notes', { path: '/:collection_id/notes'}, function() {
          this.route('edit');
          this.route('new');
        });
    });
    this.route('trash');
});
