import Model, { attr, hasMany } from '@ember-data/model';

export default class NoteModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') content;
    @hasMany('tag') tags;

    get searchString() {
        return this.content.toLowerCase();
    }
}
