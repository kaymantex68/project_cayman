import React, { useState, useEffect } from 'react'
// import product, to be deleted
import { product } from '../../../json/product'
import axios from 'axios'
import { getUsers } from '../../../functions/user'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import { useSelector } from 'react-redux'
import Loading from '../../../components/form/LoadingIcon'
import UserCard from '../../../components/userCard/UserCard'
import { Link } from 'react-router-dom'
import classes from './Users.module.css'


const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))

    // console.log('users:', users)

    useState(() => {
        setLoading(true)
        getUsers(user.token).then(res => {
            setUsers(res.data)
            setLoading(false)
        }).catch(err => {
            console.log('err', err)
            setLoading(false)
        })
    }, [])


    const ReturnPanel = () => (
        <div className={classes.container}>
            {users.map(u => {
                return (
                    <Link to={`/admin/user/${u._id}`} style={{color:"black"}}>
                        <UserCard key={u._id} user={u} />
                    </Link>
                )
            })}
        </div>
    )


    return (
        <AdminNavigation name="Dashboard" children={loading ? <Loading /> : ReturnPanel()} />
    )
}

export default Users