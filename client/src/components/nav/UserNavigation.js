import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    SolutionOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    ShoppingCartOutlined,

} from "@ant-design/icons";
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavigation = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const {sideMenu}= useSelector(state=>({...state}))
    const dispatch= useDispatch()

    useEffect(()=>{
        setCollapsed(sideMenu)
    },[])

    const onCollapse = () => {
        dispatch({
            type: "SET_VISIBLE_SIDEMENU",
            payload: !collapsed,
          });
        setCollapsed(!collapsed);
    };
   


    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                width='250'
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                style={{ overflow:"hidden" }}
            >
                <div className=" p-3"  >
                    <img style={{ width: "210px" }} src={`${process.env.REACT_APP_IMAGES_LOGO}/logo.png`} />
                </div>

                <Menu theme="dark" style={{ color: 'white' }} defaultSelectedKeys={["1"]} mode="inline" >
                    {/* <Menu.Item key="hist" style={{ color: 'white' }} icon={<HomeOutlined />}>
                        <Link to="/user/dashboard" style={{ color: 'white' }}>Личный кабинет</Link>
                    </Menu.Item> */}
                    <SubMenu key="sub1" icon={<SolutionOutlined />} title="Пользователь">
                        {/* <Menu.Item key="1">
                            <Link to="/userInformation">Личный профиль</Link>
                        </Menu.Item> */}
                        <Menu.Item key="2">
                            <Link to="/user/password">Пароль</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="card" icon={<ShoppingCartOutlined />} title="Корзина">
                        <Menu.Item key="1">
                            <Link to="/user/cart">Корзина</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="2">
                            <Link to="/user/specification">Спецификация</Link>
                        </Menu.Item> */}
                    </SubMenu>
                </Menu>

            </Sider>

            {/* content */}
            <Layout
                className="site-layout"
                style={{ padding: 0, backgroundColor: "white" }}>
                <Header
                    className="site-layout-background pl-2"
                    style={{ padding: 0, backgroundColor: "#404a57", display: "flex", justifyContent: "center" }}
                >
                    {props.name ? <span style={{ fontSize: "1rem", color: "white" }}>{props.name}</span> : null}
                </Header>
                <Content style={{ margin: "0 0px" }} className="p-2">
                    {props.children ? props.children : null}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminNavigation;
