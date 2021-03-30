import {combineReducers} from 'redux'
import {userReducer} from './userReduser'
import {cartReducer} from './cartReduser'
import { drawerReducer} from './drawerReducer'
import { sideMenuReducer } from './sideMenuReducer'
import { workReducer } from './workReducer'

const rootReducer=combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    sideMenu: sideMenuReducer,
    work: workReducer,
})

export default rootReducer

