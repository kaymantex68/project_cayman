import './App.css';
import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegistrationComplete from './pages/auth/RegistrationComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import Header from './components/nav/Header'

import { auth } from './firebase'
import { useDispatch} from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }
        })
      } else {
        // No user is signed in.
      }
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
        </Switch>
      </div>
    </>
  );
}

export default App;
