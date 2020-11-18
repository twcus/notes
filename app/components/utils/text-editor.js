import Component from '@glimmer/component';
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
            'ulist',
            'code'
        ]
    };
}
