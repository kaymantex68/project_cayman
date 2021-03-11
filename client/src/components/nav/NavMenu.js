import React, { useState } from "react";
import { Menu } from "antd";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { getBrands} from '../../functions/brand'
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
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [brands, setBrands]= useState([])

    useState(() => {
        getCategories().then((res) => {
            setCategories(res.data);
            getSubs().then((res) => {
                setSubs(res.data);
                getBrands().then(res=>{
                    setBrands(res.data)
                })
            });
        });
    }, []);

    console.log("categories", categories);
    console.log("subs", subs);
    console.log('brands', brands)

    return (
        <Menu onClick={handleClick} mode="horizontal">
            <SubMenu key="SubMenu" title="Каталог">
                {/* add category to menu */}
                {categories.map((c) => {
                    return (
                        <>
                            {c.active ? (
                                <SubMenu
                                    key={c._id}
                                    title={c.name}
                                    style={{ width: "auto" }}
                                >
                                    {/* add sub-category to menu */}
                                    {
                                        subs.map(s => {
                                            return (
                                                <>
                                                    {
                                                        s.active && c._id === s.parent ?
                                                            <SubMenu
                                                                key={s._id}
                                                                title={s.name}
                                                                style={{ width: "auto" }}
                                                            >
                                                                {brands.map(b=>{
                                                                    return (
                                                                        <>
                                                                        {
                                                                        b.active && s._id === b.parent 
                                                                        ? <Menu.Item key={b._id}>{b.name}</Menu.Item>
                                                                        : null
                                                                        }
                                                                        </>
                                                                    )
                                                                })}
                                                            </SubMenu>
                                                            : null

                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </SubMenu>
                            ) : null}
                        </>
                    );
                })}
                {/* <SubMenu key="IP" title="IP камеры" style={{ width: "auto" }}>
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
                    </SubMenu> */}
            </SubMenu>
        </Menu>
    );
};

export default NavMenu;
