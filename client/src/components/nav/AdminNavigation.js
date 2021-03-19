import React, { useState } from "react";
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

} from "@ant-design/icons";
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavigation = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh"}}>
            <Sider
                width='250'
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                // style={{ backgroundColor: "white" }}
            >
                <div className="logo" style={{ Width: "300px"  }} />

                <Menu theme="dark" style={{color:'white'}} defaultSelectedKeys={["1"]} mode="inline" >
                    <Menu.Item key="hist" style={{color:'white'}} icon={<HomeOutlined />}>
                        <Link to="/admin/dashboard" style={{color:'white'}}>Личный кабинет</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<SolutionOutlined />} title="Пользователь">
                        <Menu.Item key="1">
                            <Link to="/userInformation">Личный профиль</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/user/password">Пароль</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="category" icon={<PieChartOutlined />} title="Структура каталога">
                        <Menu.Item key="category_1"><Link to="/admin/category">Категории</Link></Menu.Item>
                        <Menu.Item key="sub_category_1"><Link to="/admin/sub">Sub-категории</Link></Menu.Item>
                        <Menu.Item key="brands"><Link to="/admin/brand">Brand</Link></Menu.Item>
                        <Menu.Item key="brandPicture"><Link to="/admin/brandPicture">Brand-лого</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="products" icon={<VideoCameraOutlined />} title="Товары">
                        <Menu.Item key="newproduct" icon={<VideoCameraAddOutlined />}>
                            <Link to="/admin/product">Новый товар</Link>
                        </Menu.Item>
                        <Menu.Item key="product" icon={<VideoCameraOutlined />}>
                            <Link to="/admin/products">Товары</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="9" style={{color:'white'}} icon={<FileOutlined />}>
                    <Link to="/admin/optimization">Оптимизация базы</Link>
                    </Menu.Item>
                </Menu>

            </Sider>

            {/* content */}
            <Layout
                className="site-layout"
                style={{ padding: 0, backgroundColor: "white" }}>
                <Header
                    className="site-layout-background pl-2"
                    style={{ padding: 0, backgroundColor: "#404a57", display: "flex", justifyContent:"center" }}
                >
                    {props.name ? <span style={{ fontSize: "1.2rem", fontWeight: "bold", color:"white" }}>{props.name}</span> : null}
                </Header>
                <Content style={{ margin: "0 0px" }} className="p-2">
                    {props.children ? props.children : null}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminNavigation;
