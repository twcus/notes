import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

/**
 * Provides utility functions related to navigation.
 */
export default class NavigationService extends Service {
    @tracked subtitle = 'Notes';

    setSubtitle(subtitle) {
        this.subtitle = subtitle;
    }
}
