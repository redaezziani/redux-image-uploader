export const addImage = (image) => {
    return {
        type: 'ADD_IMAGE',
        payload: image
    }
}

export const removeImage = (image) => {
    return {
        type: 'REMOVE_IMAGE',
        payload: image
    }
}


