
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from './functions/auth'

import {readCart} from './functions/cart'

import './App.css';
import { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loading from './components/form/LoadingIcon'
import { toast } from 'react-toastify'
// import Home from './pages/Home'
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'
// import RegistrationComplete from './pages/auth/RegistrationComplete'
// import ForgotPassword from './pages/auth/ForgotPassword'
// import Header from './components/nav/Header'

// import UserRoute from './routes/UserRoute'
// import AdminRoute from './routes/AdminRoute'

// import AdminDashboard from './pages/admin/AdminDashboard'
// import CreateCategory from './pages/admin/category/CategoryCreate'
// import UpdateCategory from './pages/admin/category/CategoryUpdate'
// import CreateSub from './pages/admin/sub/SubCreate'
// import UpdateSub from './pages/admin/sub/SubUpdate'


// import BrandLogoCreate from './pages/admin/brandLogo/BrandLogoCreate'
// import NewProduct from './pages/admin/product/NewProduct'
// import Products from './pages/admin/product/Products'
// import UpdateProduct from './pages/admin/product/UpdateProduct'
// import ProductCopy from './pages/admin/product/CopyProduct'
// import History from './pages/user/History'
// import Password from './pages/user/Password'

// import AdminNavigation from './components/nav/AdminNavigation'
// import BrandCreate from './pages/admin/brand/BrandCreate';
// import BrandUpdate from './pages/admin/brand/BrandUpdate'

// import Optimization from './pages/admin/optimization/Optimization'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Catalog = lazy(() => import('./pages/Catalog'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegistrationComplete = lazy(() => import('./pages/auth/RegistrationComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Header = lazy(() => import('./components/nav/Header'))
// const NavMenu = lazy(() => import('./components/nav/NavMenu'))
// const Footer = lazy(()=>import('./components/footer/Footer')) 

const UserRoute = lazy(() => import('./routes/UserRoute'))
const AdminRoute = lazy(() => import('./routes/AdminRoute'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CreateCategory = lazy(() => import('./pages/admin/category/CategoryCreate'))
const UpdateCategory = lazy(() => import('./pages/admin/category/CategoryUpdate'))
const CreateSub = lazy(() => import('./pages/admin/sub/SubCreate'))
const UpdateSub = lazy(() => import('./pages/admin/sub/SubUpdate'))

const CreateSlide = lazy(()=> import('./pages/admin/slider/CreateSlide'))
const UpdateSlide = lazy(()=> import('./pages/admin/slider/UpdateSlide'))
const CreateWork = lazy(()=>import('./pages/admin/work/CreateWork'))
const UpdateWork = lazy(()=>import('./pages/admin/work/UpdateWork'))
const Diler = lazy(()=>import('./pages/admin/diler/Diler'))
const GroupDiscounts = lazy(()=>import('./pages/admin/groupDiscounts/GroupDiscounts'))
const GroupDiscountUpdate= lazy(()=>import('./pages/admin/groupDiscounts/GroupDiscountUpdate'))
const BrandLogoCreate = lazy(() => import('./pages/admin/brandLogo/BrandLogoCreate'))
const NewProduct = lazy(() => import('./pages/admin/product/NewProduct'))
const Products = lazy(() => import('./pages/admin/product/Products'))
const UpdateProduct = lazy(() => import('./pages/admin/product/UpdateProduct'))
const ProductCopy = lazy(() => import('./pages/admin/product/CopyProduct'))
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'))
const Password = lazy(() => import('./pages/user/Password'))
const Users= lazy(()=>import('./pages/admin/users/Users'))
const UserDescription = lazy(()=> import ('./pages/admin/userDescription/UserDescription'))

const AdminNavigation = lazy(() => import('./components/nav/AdminNavigation'))
const BrandCreate = lazy(() => import('./pages/admin/brand/BrandCreate'))
const BrandUpdate = lazy(() => import('./pages/admin/brand/BrandUpdate'))

const Optimization = lazy(() => import('./pages/admin/optimization/Optimization'))

const SideDrawer = lazy(()=> import('./components/drawer/SideDrawer'))
const DescriptionProduct = lazy(()=>import('./components/descriptionProduct/DescriptionProduct'))
const PrinKP = lazy(()=>import('./components/printKP/PrintKP'))
//User

const Cart = lazy(()=>import('./pages/user/cart/Cart'))



const App = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=> ({...state}))

 
  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(res => {
            // redux
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                discount: res.data.discounts
              }
            })
          }).catch(err => {
            // if (err.response.status === 400) toast.error('Ваш Token закончился. Обновите страницу!');
          })

      // read users cart

      }
      return () => usubscribe()
    });
  }, [])


  useEffect(()=>{
    if(user && user.token) {
      // console.log('token change')
      readCart(user.token).then(res=>{
        dispatch({
          type: "ADD_TO_CART",
          payload: res.data.cart,
        });
        // console.log(res.data.cart)
      })
    }
  },[user])


  return (
    <>
      <Suspense fallback={
        <div>
          Загрузка...
        </div>

      }>
        
        <div>
          <Header />
          <SideDrawer/>
        </div>
        {/* <div>
          <NavMenu />
        </div> */}
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/register/complete" component={RegistrationComplete} />
            <Route exact path="/forgot/password" component={ForgotPassword} />
            <UserRoute exact path='/user/dashboard' component={UserDashboard} />
            <UserRoute exact path='/user/password' component={Password} />
            <UserRoute exact path='/user/cart' component={Cart} />
            <UserRoute exact path='/user/print' component={PrinKP} />

            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <AdminRoute exact path='/admin/category' component={CreateCategory} />
            <AdminRoute exact path='/admin/category/:slug' component={UpdateCategory} />
            <AdminRoute exact path='/admin/sub' component={CreateSub} />
            <AdminRoute exact path='/admin/sub/:_id' component={UpdateSub} />
            <AdminRoute exact path='/admin/brand' component={BrandCreate} />
            <AdminRoute exact path='/admin/brand/:_id' component={BrandUpdate} />
            <AdminRoute exact path='/admin/brandPicture' component={BrandLogoCreate} />
            <AdminRoute exact path='/admin/product' component={NewProduct} />
            <AdminRoute exact path='/admin/product/:slug' component={UpdateProduct} />
            <AdminRoute exact path='/admin/products' component={Products} />
            <AdminRoute exact path='/admin/copy/:slug' component={ProductCopy} />
            <AdminRoute exact path='/admin/slider' component={CreateSlide} />
            <AdminRoute exact path='/admin/slider/:slug' component={UpdateSlide} />
            <AdminRoute exact path='/admin/delete-image' component={Optimization} />
            <AdminRoute exact path='/admin/diler' component={Diler} />
            <AdminRoute exact path='/admin/work' component={CreateWork} />
            <AdminRoute exact path='/admin/work/:slug' component={UpdateWork} />
            <AdminRoute exact path='/admin/users' component={Users} />
            <AdminRoute exact path='/admin/user/:_id' component={UserDescription} />
            <AdminRoute exact path='/admin/groupDiscounts' component={GroupDiscounts} />
            <AdminRoute exact path='/admin/groupDiscount/:slug' component={GroupDiscountUpdate} />


            
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/catalog/brand/:filterBrand" component={Catalog} />
            <Route exact path="/catalog/:category" component={Catalog} />
            <Route exact path="/catalog/:category/:sub" component={Catalog} />
            <Route exact path="/catalog/:category/:sub/:brand" component={Catalog} />  
            <Route exact path="/catalog/:category/:sub/:brand/:name" component={DescriptionProduct} />  
            
          </Switch>
        </div>
        {/* <Footer/> */}
      </Suspense>
    </>
  );
}

export default App;
