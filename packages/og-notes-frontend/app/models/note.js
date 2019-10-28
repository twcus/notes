import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    user: DS.attr(),
    createdDate: DS.attr('date'),
    modifiedDate: DS.attr('date'),
    content: DS.attr(),
    tags: DS.hasMany('tag'),
    numTags: computed('tags.[]', function() {
        return this.hasMany('tags').ids().length;
    }),
});
