import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | notes', function(hooks) {
    setupApplicationTest(hooks);

    test('visiting /notes', async function(assert) {
        await visit('/notes');

        assert.equal(currentURL(), '/notes');
    });

    test('should show notes as the home page', async function(assert) {
        assert.equal(true, false);
    });

    test('should list notes', async function(assert) {
        assert.equal(true, false);
    });

    test('should search notes', async function(assert) {
        assert.equal(true, false);
    });

    test('should filter notes by tag', async function(assert) {
        assert.equal(true, false);
    });

    test('should show the selected note', async function(assert) {
        assert.equal(true, false);
    });
});
