
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'

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
const NavMenu = lazy(() => import('./components/nav/NavMenu'))

const UserRoute = lazy(() => import('./routes/UserRoute'))
const AdminRoute = lazy(() => import('./routes/AdminRoute'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CreateCategory = lazy(() => import('./pages/admin/category/CategoryCreate'))
const UpdateCategory = lazy(() => import('./pages/admin/category/CategoryUpdate'))
const CreateSub = lazy(() => import('./pages/admin/sub/SubCreate'))
const UpdateSub = lazy(() => import('./pages/admin/sub/SubUpdate'))

const CreateSlide = lazy(()=> import('./pages/admin/slider/CreateSlide'))
const UpdateSlide = lazy(()=> import('./pages/admin/slider/UpdateSlide'))

const BrandLogoCreate = lazy(() => import('./pages/admin/brandLogo/BrandLogoCreate'))
const NewProduct = lazy(() => import('./pages/admin/product/NewProduct'))
const Products = lazy(() => import('./pages/admin/product/Products'))
const UpdateProduct = lazy(() => import('./pages/admin/product/UpdateProduct'))
const ProductCopy = lazy(() => import('./pages/admin/product/CopyProduct'))
const History = lazy(() => import('./pages/user/History'))
const Password = lazy(() => import('./pages/user/Password'))

const AdminNavigation = lazy(() => import('./components/nav/AdminNavigation'))
const BrandCreate = lazy(() => import('./pages/admin/brand/BrandCreate'))
const BrandUpdate = lazy(() => import('./pages/admin/brand/BrandUpdate'))

const Optimization = lazy(() => import('./pages/admin/optimization/Optimization'))


const App = () => {
  const dispatch = useDispatch()

  // to check firebase auth state
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
                _id: res.data._id
              }
            })
          }).catch(err => {
            // if (err.response.status === 400) toast.error('Ваш Token закончился. Обновите страницу!');
          })
      }
      return () => usubscribe()
    });
  }, [])


  return (
    <>
      <Suspense fallback={
        <div>
          Загрузка...
        </div>

      }>
        
        <div>
          <Header />
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
            <UserRoute exact path='/user/history' component={History} />
            <UserRoute exact path='/user/password' component={Password} />

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
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/catalog/:category" component={Catalog} />
            <Route exact path="/catalog/:category/:sub" component={Catalog} />
            <Route exact path="/catalog/:category/:sub/:brand" component={Catalog} />

          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
