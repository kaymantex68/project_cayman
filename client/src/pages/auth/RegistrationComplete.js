import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import {useSelector} from 'react-redux'

const RegistrationComplete = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword]=useState('')
    const {user} = useSelector(state => ({...state}))

    useEffect(()=>{
        if(user && user.token) {
            history.push("/")
        } 
    },[user])

    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForSignIn'))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation
        if (!email || !password) {
            toast.warn('некорректные данные при завершении регистрации')
            return
        }
        if (password.length<6) {
            toast.warn('длина пароля не должна быть меньше 6 символов')
            return
        }
        try{
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                // delete email from localStorage
                window.localStorage.removeItem('emailForSignIn')
                // get user id token
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = user.getIdTokenResult()
                // redux store
                console.table('user: ', user, 'idToken: ', idTokenResult)
                // redirect 
                // history.push("/")
            }
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
        
    }
    
    const completeRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                className="form-control"
                disabled
            />
             <input
                type="password"
                value={password}
                className="form-control"
                placeholder="введите ваш пароль"
                onChange={(e) => setPassword(e.target.value)}
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
                    <h4>Завершение регистрации</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    )
}

export default RegistrationComplete