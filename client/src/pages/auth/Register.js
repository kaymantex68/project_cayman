import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import {useSelector} from 'react-redux'

const Register = ({history}) => {
    const [email, setEmail] = useState('')
    const {user} = useSelector(state => ({...state}))

    useEffect(()=>{
        if(user && user.token) {
            history.push("/")
        } 
    },[user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config={
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        // send email to complete registration
        await auth.sendSignInLinkToEmail(email, config)
        .then(() => {
            // save email in a localstorage to complete registration
          window.localStorage.setItem('emailForSignIn', email)
          toast.success(`На ${email} отправлено письмо для подтверждения регистрации`)
          // clear state
          setEmail('')
        })
        .catch((error) => {
            console.log('err: ', error.message)
            toast.error(error.message)
        });
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                className="form-control"
                placeholder="введите ваш email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <br/>
            <button type="submit" className="btn btn-raised">отправить</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Регистрация </h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register