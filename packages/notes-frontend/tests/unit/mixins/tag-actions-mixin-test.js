import EmberObject from '@ember/object';
import TagActionsMixinMixin from 'notes-frontend/mixins/tag-actions-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | tag-actions-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let TagActionsMixinObject = EmberObject.extend(TagActionsMixinMixin);
    let subject = TagActionsMixinObject.create();
    assert.ok(subject);
  });
});
