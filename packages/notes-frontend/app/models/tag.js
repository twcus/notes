import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    user: DS.attr(),
    createdDate: DS.attr('date'),
    modifiedDate: DS.attr('date'),
    content: DS.attr(),
    notes: DS.hasMany('note')
});
