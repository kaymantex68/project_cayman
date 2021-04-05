import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
// for logout
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const history = useHistory();
  const dispatch = useDispatch();
  const { user,cart } = useSelector((state) => ({ ...state }));
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  // logout function
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    dispatch({
      type: "SET_DISCOUNT",
      payload: false,
  });
    history.push("/");
  };

  return (
    <div>
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
            title={user.email && user.email.split("@")[0]}
            className="float-right"
          >
            <Menu.ItemGroup>
              {user && user.role === "admin" && (
                <Item key="adminDashboard">
                  <Link to="/admin/dashboard">АдминПанель</Link>
                </Item>
              )}
              {user && user.role === "subscriber" && (
                <Item key="adminDashboard">
                  <Link to="/user/dashboard">Личный кабинет</Link>
                </Item>
              )}
              {user && user.role === "manager" && (
                <Item key="adminDashboard">
                  <Link to="/manager/dashboard">Кабинет менеджера</Link>
                </Item>
              )}
              <Item icon={<LogoutOutlined />} onClick={logout}>
                Выход
              </Item>
            </Menu.ItemGroup>
          </SubMenu>
        )}
         <Item key="cart" className="float-right" style={{display:"flex", alignItems:"center"}}>
                <Link to="/user/cart">
                <Badge
              count={cart.length}
              // style={{ cursor: "pointer" }}
              // className="m-3"
            >
                  <ShoppingCartOutlined
                    style={{ fontSize: "1rem" }}
                  /> Корзина
                  </Badge>
                </Link>
              </Item>
      </Menu>
    </div>
  );
};

export default Header;
