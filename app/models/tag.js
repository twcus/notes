import Model, { attr, hasMany } from '@ember-data/model';

export default class TagModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') content;
    @hasMany('note') notes;
    @hasMany('collection') collections;

    validate(tags) {
        let result = { status: false }
        if (!this.content) {
            result.message = `Please enter tag text.`
        } else if (tags.without(this).any(t => t.content === this.content)) {
            result.message = `Tag "${this.content}" already exists.`
        } else {
            result.status = true;
            result.message = null;
        }
        return result;
    }
}
