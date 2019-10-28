import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';

export default Model.extend({
    user: DS.attr(),
    createdDate: DS.attr('date'),
    modifiedDate: DS.attr('date'),
    name: DS.attr(),
    tags: DS.hasMany('tag'),
    numTags: computed('tags.[]', function() {
        return this.hasMany('tags').ids().length;
    })
});
