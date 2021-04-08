import React from 'react'
import classes from './User.module.css'
import { ShoppingCartOutlined, HeatMapOutlined } from '@ant-design/icons'
import { Badge } from 'antd'

const UserCard = ({ user }) => {
    return (
        <div className={classes.userContainer}>
            <div className={classes.mail}>
                {user.email}
            </div>
            <div className={classes.name}>
                {user.name ? user.name : "- - -"}
            </div>
            <hr />
            <div>
                <div>Права: {user.role}</div>
                <hr />
                <Badge
                    style={{opacity:"0.7"}}
                    count={user.cart.length}
                >
                    <ShoppingCartOutlined style={{fontWeight:"bold",margin:"5px", fontSize:"1rem"}}/> <span style={{fontWeight:"bold"}}>Корзина</span>
            </Badge>
                <br />
                <Badge
                    style={{opacity:"0.7"}}
                    count={user.work && Object.keys(user.work).length ? Object.keys(user.work).length : 0}
                >
                    <HeatMapOutlined style={{fontWeight:"bold", margin:"5px", fontSize:"1rem"}}/> <span style={{fontWeight:"bold"}}>Работы</span>
            </Badge>
            </div>
        </div>
    )
}

export default UserCard