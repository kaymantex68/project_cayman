import React, { useState, useEffect } from 'react'
import { toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state=>({...state}))

    useEffect(()=>{
        if(user && user.token) {
            history.push("/")
        } 
    },[user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(res => {
                toast.success('Проверьте свою почту для восстановления пароля')
                setLoading(false)
            }).catch(err => {
                console.log(err)
                toast.error(err.message)
                setLoading(false)
            })
    }

    return (
        <div className="col-md-6 offset-md-3 p-5">
            {loading ? <h5>Загрузка...</h5> : <h5>Забыли пароль?</h5>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="введите ваш email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
                <br />
                <button
                    type="submit"
                    className="btn btn-raised"
                    disabled={loading}
                >
                    отправить
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword