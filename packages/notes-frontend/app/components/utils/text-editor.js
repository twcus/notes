import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class TextEditorComponent extends Component {
    pellOptions = {
        actions: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'heading1',
            'heading2',
            'paragraph',
            'quote',
            'olist',
            'ulist'
        ]
    };

    @action
    focusEditor(editorElement) {
        // Using later here because there seems to be a race condition in some instances that prevent the autofocus
        // from working, such as switching view modes
        later(() => {
            editorElement.querySelector('.pell-content').focus();
        }, 50);
    }
}
