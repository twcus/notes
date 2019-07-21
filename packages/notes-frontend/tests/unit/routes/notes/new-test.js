import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | notes/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:notes/new');
    assert.ok(route);
  });
});
