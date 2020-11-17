import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class TextEditorComponent extends Component {
    @service editorFocus;

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
}
