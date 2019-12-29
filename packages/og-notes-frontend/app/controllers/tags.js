import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        createTag(content) {
            let tag = this.store.createRecord('tag', {
                content
            });
            tag.save();
        },
        saveTag(tag) {
            tag.save();
        },
        deleteTag(tag) {
            tag.destroyRecord();
        }
    }
});
