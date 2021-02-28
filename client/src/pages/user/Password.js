import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


   
    const handleSubmit = async (e) => {
      
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then((res) => {
                setLoading(false)
                setPassword('')
                toast.success('Пароль успешно обновлен')
            }
            )
            .catch(err => {
                console.log('err ', err)
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-groupe'>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="новый пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                        className="btn btn-primary"
                        disabled={!password || password.length < 6 || loading}
                    >отправить</button>
                </div>
            </form>

        )
    }

    return (
        <div className='container-fluid' style={{ minHeight: '1250px' }}>
            <div className="row" >
                <div className="colmd-2" style={{ minHeight: '1250px' }}>
                    <UserNav />
                </div>
                <div className='col p-5' style={{ backgroundColor: 'GhostWhite' }}>
                    {loading
                    ? <h5>Загрузка...</h5>
                    : <h5>Изменить пароль</h5> }
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password