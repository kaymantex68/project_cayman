import './App.css';
import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegistrationComplete from './pages/auth/RegistrationComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import Header from './components/nav/Header'

import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'

import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/category/CategoryCreate'
import UpdateCategory from './pages/admin/category/CategoryUpdate'
import CreateSub from './pages/admin/sub/SubCreate'
import UpdateSub from './pages/admin/sub/SubUpdate'

import History from './pages/user/History'
import Password from './pages/user/Password'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'


import AdminNavigation from './components/nav/AdminNavigation'

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
          }).catch()
      }
      return () => usubscribe()
    });
  }, [])


  return (
    <>
      <div>
        <Header />
      </div>
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

          <Route exact path="/page/test" component={AdminNavigation} />

        </Switch>
      </div>
    </>
  );
}

export default App;
