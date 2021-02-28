import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRediredct'
import { currentAdmin } from '../functions/auth'

const AdminRoute = ({children,...rest }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(()=>{
        if (user && user.token) {
            currentAdmin(user.token)
            .then(res => {
                setOk(true)
            })
            .catch(err=> {
                setOk(false)
                console.log('err', err)
            })
        }
    },[user])

    return ok
        ? (<Route {...rest} render={ ()=> children}/>)
        : (<LoadingToRedirect />)
}

export default AdminRoute