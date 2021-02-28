import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  SolutionOutlined,
  CalculatorOutlined,
  HomeOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const UserNav = () => {
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
        <Link to="/user/history">Личный кабинет</Link>
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
      <SubMenu key="sub2" icon={<ShoppingCartOutlined />} title="Корзина">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<CalculatorOutlined />} title="Калькулятор">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default UserNav;
