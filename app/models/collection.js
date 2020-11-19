import Model, { attr, hasMany } from '@ember-data/model';

export default class CollectionModel extends Model {
    @attr('date') createdDate;
    @attr('date') modifiedDate;
    @attr('string') name;
    @hasMany('tag', { async: false }) tags;

    get searchString() {
        return this.name.toLowerCase();
    }

    validate(collections) {
        let result = { status: false }
        if (!this.name) {
            result.message = 'Please enter a name for this collection.';
        } else if (collections.without(this)
            .any(c => c.name === this.name)) {
            result.message = `Collection "${this.name}" already exists.`;
        } else if (!this.tags.length) {
            result.message = 'Please select tags for this collection.';
        } else {
            result.status = true;
            result.message = null;
        }
        return result;
    }
}
