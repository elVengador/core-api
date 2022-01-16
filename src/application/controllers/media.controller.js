import * as mediaRepository from "../../infraestructure/repository/media.repository"

export const getMedia = ({ id }) => {
    return mediaRepository.getMedia({ id })
}

export const addMedia = ({ mediaInput }) => {
    return mediaRepository.addMedia(mediaInput)
}

export const updateMedia = ({ mediaUpdate }) => {
    return mediaRepository.updateMedia(mediaUpdate)
}

export const removeMedia = ({ id }) => {
    return mediaRepository.removeMedia({ id })
}
