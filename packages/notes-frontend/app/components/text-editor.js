import Component from '@glimmer/component';

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
}
