import React, { useEffect } from 'react'
import UserNavigation from '../../components/nav/UserNavigation'

const UserDashboard = () => {
// here we create data for Product database
//     useEffect(() => {
//         product.map(async (p)=>{
//          return await axios.post(`${process.env.REACT_APP_API}/create/product`,
//         p).then(res=>console.log('answer: ', res.data))
//         })
        
// }, [])




return (
    <UserNavigation name="Личный кабинет"/>
)
}

export default UserDashboard