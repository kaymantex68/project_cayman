export function userInfoReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_INFORMATION':
            return action.payload;
        default:
            return state

    }
}