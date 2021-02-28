import React from "react";
import { Menu } from "antd";
// import {
//     MailOutlined,
//     AppstoreOutlined,
//     SettingOutlined,
// } from "@ant-design/icons";

const { SubMenu } = Menu;

function handleClick(e) {
    console.log("click", e);
}

const NavMenu = () => {
    return (
        <Menu onClick={handleClick} mode="horizontal">


            <SubMenu key="SubMenu" title="Каталог">

                <SubMenu key="IP" title="IP камеры" style={{ width: "auto" }}>
                    <SubMenu key="IPoutdoor" title="IP камеры уличные" style={{ width: "auto" }}>
                        <Menu.Item key="7">Dahua</Menu.Item>
                        <Menu.Item key="8">HiWatch</Menu.Item>
                    </SubMenu>
                    <SubMenu key="IPindoore" title="IP камеры  купольные" style={{ width: "auto" }}>
                        <Menu.Item key="9">Dahua</Menu.Item>
                        <Menu.Item key="10">HiWatch</Menu.Item>
                    </SubMenu>
                </SubMenu>

                <SubMenu key="AHD" title="AHD камеры" style={{ width: "auto" }}>
                    <SubMenu key="AHDoutdoor" title="AHD камеры уличные" style={{ width: "auto" }}>
                        <Menu.Item key="11">Dahua</Menu.Item>
                        <Menu.Item key="12">HiWatch</Menu.Item>
                    </SubMenu>
                    <SubMenu key="AHDindoore" title="AHD камеры  купольные" style={{ width: "auto" }}>
                        <Menu.Item key="13">Dahua</Menu.Item>
                        <Menu.Item key="14">HiWatch</Menu.Item>
                    </SubMenu>
                </SubMenu>
               
            </SubMenu>
        </Menu>
    );
};

export default NavMenu;
