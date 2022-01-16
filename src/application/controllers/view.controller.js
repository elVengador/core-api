import * as viewRepository from "../../infraestructure/repository/view.repository"

export const getView = ({ id }) => {
    return viewRepository.getView({ id })
}

export const addView = ({ viewInput }) => {
    return viewRepository.addView(viewInput)
}
