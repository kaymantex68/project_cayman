import React, { useState, useEffect } from 'react'
// import product, to be deleted
import { product } from '../../json/product'
import axios from 'axios'
import { getUsers } from '../../functions/user'
import AdminNavigation from '../../components/nav/AdminNavigation'
import { useSelector } from 'react-redux'
import Loading from '../../components/form/LoadingIcon'
import UserCard from '../../components/userCard/UserCard'
import classes from './AdminDashboard.module.css'
import { listOrders, removeOrder, updateOrder } from '../../functions/orderBook'
import { Tabs, Menu } from 'antd';
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import { stubArray } from 'lodash'
const { TabPane } = Tabs;
const { SubMenu, ItemGroup } = Menu;

const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [status, setStatus]= useState(0)

    const { user } = useSelector(state => ({ ...state }))

    console.log('orders:', orders)

    const loadOrders = () => {
        listOrders(user.token).then(res => {
            setOrders(res.data)
        })
    }


    console.log('status', status)

    useState(async () => {
        setLoading(true)
        getUsers(user.token).then(res => {
            setUsers(res.data)
            listOrders(user.token).then(res => {
                setOrders(res.data)
                setLoading(false)
            })
        }).catch(err => {
            console.log('err', err)
            setLoading(false)
        })
    }, [])

    const handleRemove = (e, order) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeOrder(order._id, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Заказ ${order.orderId} удален`);
                    loadOrders()
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    }

    const handleUpdate = async (e, order) => {
        console.log('status--------------', status)
        setLoading(true);
        let newOrder = { ...order }
        let statusArray = [...order.status]
        statusArray.push({ admin: user.name || user.email, status: status })
        newOrder.status = statusArray
        newOrder.statusIndex = status

        await updateOrder(order._id, newOrder, user.token)
            .then((res) => {
                setLoading(false);
                toast.warning(`Заказ ${order.orderId} обновлен`);
                loadOrders()
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const NewOrder = () => (
        <div >
            <Menu mode="inline" defaultOpenKeys={[]}>
                {orders.filter(o => o.statusIndex === 0).map(o => {
                    return (
                        <>
                            {orderMenu(o)}
                        </>
                    )
                })}
            </Menu>
        </div>
    )

    const processOrder = () => (
        <div >
            <Menu mode="inline" defaultOpenKeys={[]}>
                {orders.filter(o => o.statusIndex > 0 && o.statusIndex < 20).map(o => {
                    return (
                        <>
                            {orderMenu(o)}
                        </>
                    )
                })}
            </Menu>
        </div>
    )

    const completeOrder = ()=>(
        <div >
        <Menu mode="inline" defaultOpenKeys={[]}>
            {orders.filter(o => o.statusIndex >=20  && o.statusIndex < 30).map(o => {
                return (
                    <>
                        {orderMenu(o)}
                    </>
                )
            })}
        </Menu>
    </div>
    )

    const orderMenu = (o) => (
        <>
            <SubMenu
                key={o._id}
                title={
                    <span>
                        <span style={{ color: "red", fontWeight: "bold", marginRight: "10px", padding: "2px", border: "1px red solid", borderRadius: "5px" }}>{`${o.orderBy.name || o.orderBy.email}`}</span>
                        <span style={{ color: "black", fontWeight: "bold", marginRight: "10px", padding: "2px", border: "1px black solid", borderRadius: "5px" }}>{`${o.orderId}`}</span>
                        <span style={{ color: "green", fontWeight: "bold", marginRight: "10px", padding: "2px", border: "1px green solid", borderRadius: "5px" }}>{`${o.sumDiscount} руб.`}</span>
                        <span style={{ color: "cornflowerblue", fontWeight: "bold", marginRight: "10px", padding: "2px", border: "1px cornflowerblue solid", borderRadius: "5px" }}>{`${o.createdAt}`}</span>
                    </span>
                }
                className="container"
            >
                <div>
                    <div className="mb-3 mt-3">{`сумма без скидки: ${o.sum} руб`}</div>

                    <div className="mb-3">{`сумма со скидкой: ${o.sumDiscount} руб.`}</div>
                    <div className="alert  " style={{ minHeight: "50px" }}>
                        <span
                            className="btn btn-sm  float-right"
                        >
                            <DeleteOutlined className="text-danger" onClick={(e) => handleRemove(e, o, status)} />
                        </span>

                        <div className="form-group">
                            <button
                                className="btn btn-sm  float-right"
                                onClick={(e) => handleUpdate(e, o)}
                            >
                                изменить статус
                        </button>
                            <select name="status" className="form-control float-right"
                                style={{ maxWidth: "300px" }}
                            onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value={0} selected={o.statusIndex===0}>новый заказ</option>
                                <option value={1} selected={o.statusIndex===1}>в обработке</option>
                                <option value={2} selected={o.statusIndex===2}>на сборке</option>
                                <option value={3} selected={o.statusIndex===3}>отправлен</option>
                                <option value={20} selected={o.statusIndex===20}>завершен</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <table className="table table-bordered container">
                            <thead className="thead-dark">
                                <tr className="text-center">
                                    <th scope="col" style={{ width: "50px" }}>№</th>
                                    <th scope="col" style={{ width: "150px" }}>Изображение</th>
                                    <th scope="col" style={{ width: "300px" }}>Наименование</th>
                                    <th scope="col" style={{ width: "200px" }}>Brand</th>
                                    <th scope="col" style={{ width: "200px" }}>Кол-во</th>
                                    <th scope="col" style={{ width: "200px" }}>Скидка %</th>
                                    <th scope="col" style={{ width: "200px" }}>Цена (скидка)</th>
                                    <th scope="col" style={{ width: "200px" }}>Цена (розница)</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    o.products.map((p, index) => {
                                        let pathImage;
                                        if (p.images.length > 0)
                                            pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`;
                                        else pathImage = "/images/product/default.png";
                                        return (
                                            <tr key={p._id} >
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{index + 1}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                                                    <img
                                                        style={{
                                                            maxWidth: "90px",
                                                            maxHeight: "70px",
                                                            // border: "1px solid black",
                                                        }}
                                                        alt="picture"
                                                        src={pathImage}
                                                    />
                                                </td>
                                                <td className="text-center" style={{ fontSize: "0.9rem", verticalAlign: "middle", maxWidth: "80px", wordBreak: "break-all" }}>{p.name}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.brand}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.count}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.percentDiscount}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.coastDiscount}</td>
                                                <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.coast}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </SubMenu>
            <hr />
        </>
    )


    const ReturnPanel = () => (
        <div className="container">
            <Tabs defaultActiveKey="1" type="card" className="container">
                <TabPane tab="Новые заказы" key="1" className="container">
                    {NewOrder()}
                </TabPane>
                <TabPane tab="В обработке" key="2">
                    {processOrder()}
                </TabPane>
                <TabPane tab="Завершенные" key="3">
                    {completeOrder()}
                </TabPane>
            </Tabs>
        </div>
    )


    return (
        <AdminNavigation name="Dashboard" children={loading ? <Loading /> : ReturnPanel()} />
    )
}

export default AdminDashboard