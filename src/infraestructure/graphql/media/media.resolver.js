import * as mediaController from '../../../application/controllers/media.controller';

export const mediaResolver = {
    getMedia: mediaController.getMedia,
    addMedia: mediaController.addMedia,
    updateMedia: mediaController.updateMedia,
    removeMedia: mediaController.removeMedia
}