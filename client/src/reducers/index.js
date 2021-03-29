import {combineReducers} from 'redux'
import {userReducer} from './userReduser'
import {cartReducer} from './cartReduser'
import { drawerReducer} from './drawerReducer'

const rootReducer=combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer,
})

export default rootReducer

