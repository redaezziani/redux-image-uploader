
const initialState = {
    images: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_IMAGE':
            return {
                ...state,
                images: [...state.images, action.payload]
            }
        case 'REMOVE_IMAGE':
            return {
                ...state,
                images: state.images.filter(image => image !== action.payload)
            }
        
        default:
            return state;
    }
}

export default reducer;




                
