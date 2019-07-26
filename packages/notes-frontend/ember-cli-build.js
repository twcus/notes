'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    let app = new EmberApp(defaults, {
        sassOptions: {
            includePaths: ['node_modules/minireset.css']
        },
	'ember-modal-dialog': { buildTarget: 'app' }
    });

    return app.toTree();
};
