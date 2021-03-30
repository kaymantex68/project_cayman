export const sideMenuReducer = (state = true, action) => {
    switch (action.type) {
        case "SET_VISIBLE_SIDEMENU":
            return action.payload
        default:
            return state;
    }
};