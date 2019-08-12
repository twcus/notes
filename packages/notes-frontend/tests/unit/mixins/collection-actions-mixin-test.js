import EmberObject from '@ember/object';
import CollectionActionsMixinMixin from 'notes-frontend/mixins/collection-actions-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | collection-actions-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CollectionActionsMixinObject = EmberObject.extend(CollectionActionsMixinMixin);
    let subject = CollectionActionsMixinObject.create();
    assert.ok(subject);
  });
});
