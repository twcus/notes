import Mixin from '@ember/object/mixin';

export default Mixin.create({
    actions: {
        saveCollection(collection) {
            return collection.save();
        },
        saveAndCloseCollection(collection) {
            return collection.save()
                .then(res => {
                    this.transitionToRoute('collections');
                    return res;
                });
        },
        deleteCollection(collection) {
            return collection.destroyRecord();
        }
    }
});
