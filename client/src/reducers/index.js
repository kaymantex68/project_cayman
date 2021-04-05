import { combineReducers } from 'redux'
import { userReducer } from './userReduser'
import { cartReducer } from './cartReduser'
import { drawerReducer } from './drawerReducer'
import { sideMenuReducer } from './sideMenuReducer'
import { workReducer } from './workReducer'
import { filterReducer } from './filterReducer'
import { userInfoReducer } from './userInfoReducer'
import { setDiscountReducer } from './setDiscountReducer'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    sideMenu: sideMenuReducer,
    work: workReducer,
    filter: filterReducer,
    userInfo: userInfoReducer,
    globalDiscount: setDiscountReducer,
})

export default rootReducer

