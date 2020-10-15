import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | collections/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:collections/new');
    assert.ok(route);
  });
});
