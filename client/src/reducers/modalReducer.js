export const modalReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_VISIBLE_MODAL":
            return action.payload
        default:
            return state;
    }
};