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
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const FilterCatalog = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width="250"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ backgroundColor: "white" }}
      >
        <div className="logo" style={{ Width: "300px" }} />

        <Menu
          theme="light"
          style={{ color: "black" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <HomeOutlined />
          
          {/* <Menu.Item key="hist" style={{ color: 'black' }} icon={<HomeOutlined />}>
                        <Link to="/user/dashboard" style={{ color: 'black' }}>Личный кабинет</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<SolutionOutlined />} title="Пользователь">
                        <Menu.Item key="1">
                            <Link to="/userInformation">Личный профиль</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/user/password">Пароль</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="card" icon={<SolutionOutlined />} title="Корзина">
                        <Menu.Item key="1">
                            <Link to="/user/cart">Корзина</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/user/specification">Спецификация</Link>
                        </Menu.Item>
                    </SubMenu> */}
        </Menu>
      </Sider>

      {/* content */}
      <Layout
        className="site-layout"
        style={{ padding: 0, backgroundColor: "white" }}
      >
        <Content style={{ margin: "0 0px" }} className="p-2">
          {props.children ? props.children : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default FilterCatalog;
