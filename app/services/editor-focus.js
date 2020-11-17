import Service from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

/**
 * This service is to manage the auto-focusing of the note editor during transitions.
 */
export default class EditorFocusService extends Service {
    focusedElement = '';

    setFocusedElement(element) {
        this.focusedElement = element;
    }

    @action
    focusEditor(editorElement) {
        // Don't focus the editor if the user is searching.
        if (document.activeElement.tagName.toLowerCase() !== 'input') {
            // Using later here because there seems to be a race condition in some instances that prevent the autofocus
            // from working, such as switching view modes
            later(() => {
                const contentElement = editorElement.querySelector('.pell-content');
                contentElement.focus();
                // If the editor is already focused, move caret to the end of the text in the editor.
                // This is to handle the case where a new note is created by an autosave while typing, and the caret jumps back to
                // the start of the editor during the transition to the edit route. This block keeps the caret at the end.
                // TODO It's assumed that the caret is at the end of the text during the transition, but it's possible, however unlikely,
                // it might be somewhere in the middle. Technically, the position of the caret should be tracked, so it can remain exactly where it is
                // after the transition.
                if (this.focusedElement.className === 'pell-content') {
                    if (typeof window.getSelection !== "undefined"
                        && typeof document.createRange !== "undefined") {
                        let range = document.createRange();
                        range.selectNodeContents(contentElement);
                        range.collapse(false);
                        let sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (typeof document.body.createTextRange !== "undefined") {
                        let textRange = document.body.createTextRange();
                        textRange.moveToElementText(contentElement);
                        textRange.collapse(false);
                        textRange.select();
                    }
                }
            }, 50);
        }
    }
}

