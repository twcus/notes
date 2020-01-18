import Model, { attr, hasMany } from '@ember-data/model';

export default class CollectionModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') name;
    @hasMany('tag') tags;
}
