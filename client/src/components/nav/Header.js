import React, { useState } from "react";
import { Menu } from "antd";
import {
    LogoutOutlined,
    UserOutlined,
    UserAddOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
// for logout
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
const { SubMenu, Item } = Menu;



const Header = () => {
    const [current, setCurrent] = useState("home");


    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector(state => ({ ...state }))
    const handleClick = (e) => {
        setCurrent(e.key);
    };
    // logout function
    const logout = () => {
        auth.signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null,
        })
        history.push('/')
    }


    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home">
                <Link to="/">Главная</Link>
            </Menu.Item>

            {!user && (
                <Item
                    key="registration"
                    icon={<UserAddOutlined />}
                    className="float-right"
                >
                    <Link to="/register">Регистрация</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Вход</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    key="SubMenu"
                    icon={<CaretDownOutlined />}
                    title={user.email && user.email.split('@')[0]}
                    className='float-right'
                >
                    <Menu.ItemGroup>
                        <Item key="setting:1">Личный кабинет</Item>
                        <Item icon={<LogoutOutlined />} onClick={logout}>Выход</Item>
                    </Menu.ItemGroup>
                </SubMenu>
            )}
        </Menu >
    );
};

export default Header;
