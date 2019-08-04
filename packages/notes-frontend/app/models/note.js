import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.attr(),
    createdDate: DS.attr('date'),
    modifiedDate: DS.attr('date'),
    content: DS.attr(),
    tags: DS.hasMany('tag')
});
