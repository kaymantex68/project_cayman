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
   
} from "@ant-design/icons";
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavigation = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        console.log(collapsed);
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                width='250'
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                style={{ backgroundColor: "white"}}
            >
                <div className="logo" style={{ Width: "300px" }}/>

                <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" >
                    <Menu.Item key="hist" icon={<HomeOutlined />}>
                        <Link to="/admin/dashboard">Личный кабинет</Link>
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
                        <Menu.Item key="brands">Брэнды</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
          </Menu.Item>
                </Menu>

            </Sider>

            {/* content */}
            <Layout className="site-layout">
                <Header
                    className="site-layout-background pl-2"
                    style={{ padding: 0, backgroundColor: "white" }}
                >
                    {props.name? <span style={{fontSize: "1.2rem"}}>{props.name}</span>: null}
        </Header>
                <Content style={{ margin: "0 0px" }} className="p-2">
                    {props.children? props.children : null }
                    </Content>
            </Layout>
        </Layout>
    );
};

export default AdminNavigation;
