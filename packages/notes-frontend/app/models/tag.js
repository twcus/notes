import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default class TagModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') content;
    @hasMany('note') notes;
}
