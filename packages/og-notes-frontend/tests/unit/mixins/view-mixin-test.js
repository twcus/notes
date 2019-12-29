import EmberObject from '@ember/object';
import ViewMixinMixin from 'notes-frontend/mixins/view-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | view-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ViewMixinObject = EmberObject.extend(ViewMixinMixin);
    let subject = ViewMixinObject.create();
    assert.ok(subject);
  });
});
