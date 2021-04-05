import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from '../../firebase'
import { Button } from 'antd'
import {
    MailOutlined,
    GoogleOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrUpdateUser} from '../../functions/auth'
import {getUser} from '../../functions/user'




const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            console.log('user info', user)
            history.push("/")
        }
    }, [user, history])

    // redirect depending on user role
    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push("/");
            // history.push("/admin/dashboard")
        }
        if (res.data.role === 'subscriber') {
            history.push("/");
            // history.push('/user/dashboard')
        }
        if (res.data.role === 'manager') {
            history.push("/");
            // history.push('/manager/dashboard')
        }
    }


    // login with login and password
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()
            // console.log('token ',idTokenResult.token)
            createOrUpdateUser(idTokenResult.token)
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
                    setLoading(false)
                    // history.push('/')
                    // redirect depending on user role (admin, subscriber)
                    roleBasedRedirect(res)
                })
                .catch()

        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
    }

    // login with gmail.com
    const googleLogin = async () => {
        setLoading(true)
        auth.signInWithPopup(googleAuthProvider)
            .then(async (res) => {
                const { user } = res
                const idTokenResult = await user.getIdTokenResult()
                createOrUpdateUser(idTokenResult.token)
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
                        setLoading(false)
                        // redirect depending on user role (admin, subscriber)
                        roleBasedRedirect(res)
                    })
                    .catch()
            }).catch(err => {
                console.log(err)
                toast.error(err.message)
            })
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="введите ваш email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={password}
                    className="form-control"
                    placeholder="введите пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                block
                shape="round"
                className="mb-3"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6 || loading}
            >
                Вход email/password
            </Button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h5 className="text-muted">Загрузка...</h5> : <h5>Вход</h5>}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        block
                        shape="round"
                        className="mb-3"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Вход gmail.com
            </Button>
                    <Link to='/forgot/password' className="float-right text-danger">Забыли пароль?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login