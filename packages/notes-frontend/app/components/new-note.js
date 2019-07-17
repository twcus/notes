import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    content: null,
    actions: {
        save() {
            let note = this.store.createRecord('note', {
                content: this.get('content'),
            });
            this.onSave(note);
        },
        cancel() {
            this.onCancel();
        }
    }
});
