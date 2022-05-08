import DS from 'ember-data';
import { inject } from '@ember/service';

// Attempting to migrate this to a native class broke everything.
export default DS.JSONAPIAdapter.extend({
    session: inject('session'),
    namespace: 'api',

    get headers() {
        if (this.session.isAuthenticated) {
            return {
                Authorization: `Bearer ${this.session.data.authenticated.token}`,
            };
        } else {
            return {};
        }
    },

    handleResponse(status) {
        if (status === 401 && this.session.isAuthenticated) {
            this.session.invalidate();
        }
        return this._super(...arguments);
    },
});
