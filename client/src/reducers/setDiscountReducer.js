export const setDiscountReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_DISCOUNT":
            return action.payload
        default:
            return state;
    }
};