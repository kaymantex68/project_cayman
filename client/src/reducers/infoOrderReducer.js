export const infoOrderReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_INFO_ORDER":
            return action.payload
        default:
            return state;
    }
};