import React from 'react'
import classes from './User.module.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge } from 'antd'

const UserCard = ({ user }) => {
    return (
        <div className={classes.userContainer}>
            <div>
                {user.email}
            </div>
            <div>
                {user.name ? user.name : "- - -"}
            </div>
            <hr />
            <div>
                <Badge
                    count={user.cart.length}
                >
                    <ShoppingCartOutlined /> Корзина
            </Badge>
            </div>
        </div>
    )
}

export default UserCard