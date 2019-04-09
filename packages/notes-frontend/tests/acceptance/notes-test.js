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
    });

    test('should list notes', async function(assert) {
    });

    test('should search notes', async function(assert) {
    });

    test('should filter notes by tag', async function(assert) {
    });

    test('should show the selected note', async function(assert) {
    });
});
