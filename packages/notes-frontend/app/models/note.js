import DS from 'ember-data';
const { Model, attr } = DS;

export default class NoteModel extends Model {
    // @belognsTo('user') user;
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') content;
    // @hasMany('tag') tags;
}
