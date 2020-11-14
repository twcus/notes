import DS from 'ember-data';
import TokenAdapterMixin from 'ember-simple-auth-token/mixins/token-adapter';

export default DS.JSONAPIAdapter.extend(TokenAdapterMixin, {
    namespace: 'api'
});
