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
    ToolOutlined,
    ClearOutlined,
    ColumnWidthOutlined,
    RobotOutlined,
    PercentageOutlined,
    ContactsOutlined

} from "@ant-design/icons";
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminNavigation = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const {sideMenu}= useSelector(state=>({...state}))
    const dispatch= useDispatch()

    // console.log('sideMenu', sideMenu)

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
                    <Link to="/"><img style={{width: "210px"}} src={`${process.env.REACT_APP_IMAGES_LOGO}/logo.png`} /></Link>
                </div>
               

                <Menu theme="dark" style={{ color: 'white' }} defaultSelectedKeys={["1"]} mode="inline" >
                    <Menu.Item key="hist" style={{ color: 'white' }} icon={<HomeOutlined />}>
                        <Link to="/admin/dashboard" style={{ color: 'white' }}>Личный кабинет</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<SolutionOutlined />} title="Настройки Администратор">
                        <Menu.Item key="2">
                            <Link to="/user/password">Пароль</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="users" icon={<UserOutlined />} title="Пользователи">
                        <Menu.Item key="3">
                            <Link to="/admin/users">Статистика</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="groupDiscounts" icon={<PercentageOutlined />} title="Скидочные группы">
                        <Menu.Item key="4">
                            <Link to="/admin/groupDiscounts">Скидки</Link>
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
                    <SubMenu key="works" icon={<ToolOutlined />} title="Работы">
                        <Menu.Item key="newwork" icon={<VideoCameraAddOutlined />}>
                            <Link to="/admin/work">Виды работ</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="optimization" icon={<ClearOutlined />} title="Оптимизация базы">
                        <Menu.Item key="9" style={{ color: 'white' }} >
                            <Link to="/admin/delete-image">Удаление изображений</Link>
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu key="slider" icon={<ColumnWidthOutlined />} title="Слайдер">
                        <Menu.Item key="slider1" style={{ color: 'white' }} >
                            <Link to="/admin/slider">Слайды</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="diler" icon={<RobotOutlined />} title="Дилер">
                        <Menu.Item key="diler1" style={{ color: 'white' }} >
                            <Link to="/admin/diler">Дилер</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="contacts" icon={<ContactsOutlined />} title="Контакты">
                        <Menu.Item key="contacts1" style={{ color: 'white' }} >
                            <Link to="/admin/contacts">Контакты</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

            </Sider>

            {/* content */}
            <Layout
                className="site-layout"
                style={{ padding: 0, backgroundColor: "white" }}>
                <Header
                    className="site-layout-background pl-2"
                    style={{ padding: 0, backgroundColor: "lightslategrey", display: "flex", justifyContent: "center" }}
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
