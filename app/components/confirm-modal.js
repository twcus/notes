import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ConfirmModalComponent extends Component {
    @service media;

    get target() {
        return this.media.isDesktop ? '.toolbar' : "body";
    }

    get offset() {
        return this.media.isDesktop ? '250px 0' : null;
    }

    get attachment() {
        return this.media.isDesktop ? "top center" : "center center";
    }
}
