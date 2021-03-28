import {combineReducers} from 'redux'
import {userReducer} from './userReduser'
import {cartReducer} from './cartReduser'
const rootReducer=combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer

