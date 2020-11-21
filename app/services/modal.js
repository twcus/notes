import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class ModalService extends Service {
    @service media;
    
    get class() {
        return this.media.isDesktop ? 'small' : 'large';
    }

    get target() {
        return this.media.isDesktop ? '.toolbar' : 'body';
    }

    get offset() {
        return this.media.isDesktop ? '250px 0' : null;
    }

    get attachment() {
        return this.media.isDesktop ? 'top center' : 'center center';
    }
}
