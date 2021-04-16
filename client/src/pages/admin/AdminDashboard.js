import React, {useState, useEffect } from 'react'
// import product, to be deleted
import { product } from '../../json/product'
import axios from 'axios'
import {getUsers} from '../../functions/user'
import AdminNavigation from '../../components/nav/AdminNavigation'
import {useSelector} from 'react-redux'
import Loading from '../../components/form/LoadingIcon'
import UserCard from '../../components/userCard/UserCard'
import classes from './AdminDashboard.module.css'
import {listOrders} from '../../functions/orderBook'
import { Tabs, Menu} from 'antd';
const { TabPane } = Tabs;
const { SubMenu, ItemGroup } = Menu;

const AdminDashboard = () => {
const [users, setUsers]=useState([])
const [loading, setLoading]=useState(false)
const [orders, setOrders]=useState([])

const {user}= useSelector(state=>({...state}))

console.log('orders:', orders)

useState(async ()=>{
    setLoading(true)
    getUsers(user.token).then(res=>{
        setUsers(res.data)
        listOrders().then(res=>{
            setOrders(res.data)
            setLoading(false)
        })
    }).catch(err=>{
        console.log('err', err)
        setLoading(false)
    })
},[])

const NewOrder = () =>(
    <div >
    <Menu  mode="inline" defaultOpenKeys={[]}>
        {orders.map(o=>{
            return (
                <>
                <SubMenu
                key={o._id}
                title={
                    <span>
                        <span style={{color: "red", fontWeight:"bold", marginRight:"10px", padding:"2px", border:"1px red solid", borderRadius:"5px"}}>{`${o.orderBy.name || o.orderBy.email}`}</span> 
                        <span style={{color:"black", fontWeight:"bold", marginRight:"10px", padding:"2px", border:"1px black solid", borderRadius:"5px"}}>{`${o.orderId}`}</span>   
                        <span style={{color:"green", fontWeight:"bold",marginRight:"10px", padding:"2px", border:"1px green solid", borderRadius:"5px"}}>{`${o.sumDiscount} руб.`}</span>
                        <span style={{color:"cornflowerblue", fontWeight:"bold", marginRight:"10px", padding:"2px", border:"1px cornflowerblue solid", borderRadius:"5px"}}>{`${o.createdAt}`}</span>
                    </span>
                }
                className="container"
            >

                </SubMenu>
                <hr/>
                </>
            ) 
        })}
    </Menu>
    </div>
)

const ReturnPanel=()=>(
    <div className="container">
        <Tabs defaultActiveKey="1" type="card" className="container">
                <TabPane tab="Новые заказы" key="1" className="container">
                    {NewOrder()}
                </TabPane>
                <TabPane tab="В обработке" key="2">
                    заказы в обработке
                </TabPane>
                <TabPane tab="Завершенные" key="3">
                    завершенные
                </TabPane>
            </Tabs>
        </div>
)


return (
    <AdminNavigation name="Dashboard" children={loading ? <Loading /> : ReturnPanel()} />
)
}

export default AdminDashboard