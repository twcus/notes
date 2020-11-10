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
  this.route('collections', function() {
      this.route('new');
      this.route('edit', { path: '/:collection_id' });
  });
  this.route('collection-notes', { path: '/collections/:collection_id/notes' }, function() {
      this.route('new');
      this.route('edit', { path: '/:note_id' });
  });
  this.route('tags', function() {
      this.route('new');
      this.route('edit', { path: '/:tag_id' });
  });
  this.route('trash');
  this.route('login');
});
