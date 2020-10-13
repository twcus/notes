import Model, { attr, hasMany } from '@ember-data/model';

export default class TagModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') content;
    @hasMany('note') notes;
    @hasMany('collection') collections;
}
