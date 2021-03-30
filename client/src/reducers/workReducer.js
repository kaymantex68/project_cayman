export function workReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_TO_WORK':
            return action.payload;
        case 'REMOVE_FROM_WORK':
            return action.payload;
        default:
            return state

    }
}