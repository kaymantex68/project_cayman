import React, { useEffect } from 'react'
import AdminNav from '../../components/nav/AdminNav'
// import product, to be deleted
import { product } from '../../json/product'
import axios from 'axios'



const AdminDashboard = () => {
// here we create data for Product database
//     useEffect(() => {
//         product.map(async (p)=>{
//          return await axios.post(`${process.env.REACT_APP_API}/create/product`,
//         p).then(res=>console.log('answer: ', res.data))
//         })
        
// }, [])



// {console.log(JSON.parse(JSON.stringify(product)))}   
return (
    <div className='container-fluid' style={{ minHeight: '1250px' }}>
        <div className="row" >
            <div className="colmd-2" style={{ minHeight: '1250px' }}>
                <AdminNav />
            </div>
            <div className='col' style={{ backgroundColor: 'GhostWhite' }}>
                Панель Администратора
                </div>
        </div>
    </div>
)
}

export default AdminDashboard