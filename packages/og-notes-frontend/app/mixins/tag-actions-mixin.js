import Mixin from '@ember/object/mixin';

export default Mixin.create({
    actions: {
        saveTag(tag) {
            return tag.save();
        },
        deleteTag(tag) {
            return tag.destroyRecord();
        },
        getTags() {
            return this.store.findAll('tag');
        }
    }
});
