import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
    BarsOutlined,
    SolutionOutlined,
    PieChartOutlined,
    HomeOutlined,
    BarcodeOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const AdminNav = () => {
    const [openKeys, setOpenKeys] = React.useState(["sub1"]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ width: 256 }}
        >
            <Menu.Item key="hist" icon={<HomeOutlined />}>
                <Link to="/admin/dashboard">Личный кабинет</Link>
            </Menu.Item>
            <SubMenu
                key="sub1"
                icon={<SolutionOutlined />}
                title="Настроки пользователя"
            >
                <Menu.Item key="1">
                    <Link to="/userInformation">Личный профиль</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/user/password">Пароль</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="category" icon={<BarsOutlined />} title="Структура каталога">
                <Menu.Item key="5">Категории</Menu.Item>
                <Menu.Item key="6">Sub-категории</Menu.Item>
                <Menu.Item key="7">Брэнды</Menu.Item>
                
            </SubMenu>
            <SubMenu key="prod" icon={<BarcodeOutlined />} title="Товары">
                <Menu.Item key="9">Редактирование</Menu.Item>
            </SubMenu>
            <SubMenu key="crm" icon={<PieChartOutlined />} title="CRM">
                <Menu.Item key="13">Option 9</Menu.Item>
                <Menu.Item key="14">Option 10</Menu.Item>
                <Menu.Item key="15">Option 11</Menu.Item>
                <Menu.Item key="16">Option 12</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default AdminNav;
