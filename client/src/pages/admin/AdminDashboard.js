import React, {useState, useEffect } from 'react'
// import product, to be deleted
import { product } from '../../json/product'
import axios from 'axios'
import {getUsers} from '../../functions/user'
import AdminNavigation from '../../components/nav/AdminNavigation'
import {useSelector} from 'react-redux'
import Loading from '../../components/form/LoadingIcon'

const AdminDashboard = () => {
const[users, setUsers]=useState([])
const [loading, setLoading]=useState(false)

const {user}= useSelector(state=>({...state}))

// console.log('users:', users)

useState(()=>{
    setLoading(true)
    getUsers(user.token).then(res=>{
        setUsers(res.data)
        setLoading(false)
    }).catch(err=>{
        console.log('err', err)
        setLoading(false)
    })
},[])


const ReturnPanel=()=>(
    <div>
        {users.map(u=>{
            return (
            // <div className={classes.UserCardContainer}>
                <p>{u.email}</p>
            // </div>
            
            )
        })}
        </div>
)


return (
    <AdminNavigation name="АдминПанель" children={loading ? <Loading /> : ReturnPanel()} />
)
}

export default AdminDashboard