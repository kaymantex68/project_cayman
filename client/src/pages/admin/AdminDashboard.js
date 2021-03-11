import React, { useEffect } from 'react'
// import product, to be deleted
import { product } from '../../json/product'
import axios from 'axios'
import {getCategories} from '../../functions/category'
import AdminNavigation from '../../components/nav/AdminNavigation'

const AdminDashboard = () => {
// here we create data for Product database
//     useEffect(() => {
//         product.map(async (p)=>{
//          return await axios.post(`${process.env.REACT_APP_API}/create/product`,
//         p).then(res=>console.log('answer: ', res.data))
//         })
        
// }, [])




return (
    <AdminNavigation name="АдминПанель"/>
)
}

export default AdminDashboard