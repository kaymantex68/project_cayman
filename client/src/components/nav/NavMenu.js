import React, { useState } from "react";
import { Menu } from "antd";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { getBrands } from '../../functions/brand'
import { Link, useHistory } from 'react-router-dom'
import classes from './NavMenu.module.css'
import 'antd/dist/antd.css'
// import {
//     MailOutlined,
//     AppstoreOutlined,
//     SettingOutlined,
// } from "@ant-design/icons";

const { SubMenu } = Menu;

function handleClick(e) {
    // console.log("click", e);
}

const NavMenu = () => {
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [brands, setBrands] = useState([])

    const history = useHistory()

    useState(() => {
        getCategories().then((res) => {
            setCategories(res.data);
            getSubs().then((res) => {
                setSubs(res.data);
                getBrands().then(res => {
                    setBrands(res.data)
                })
            });
        });
    }, []);

    // console.log("categories", categories);
    // console.log("subs", subs);
    // console.log('brands', brands)

    const handleGoToCatalog = () => {
        // console.log('catalog')
        history.push('/catalog')
    }

    const handleGoToCategory = (category) => {
        // console.log('category', category)
        // console.log('link', `/catalog/${category}`)
        history.push(`/catalog/${category.slug}`)
    }

    const handleGoToSub = (category, sub) => {
        // console.log('category && sub', category, sub)
        // console.log('link', `/catalog/${category}/${sub}`)
        history.push(`/catalog/${category}/${sub}`)
    }

    const handleGoToBrand = (category, sub, brand) => {
        // console.log('category && sub && brand', category, sub, brand)
        // console.log('link', `/catalog/${category}/${sub}/${brand}`)
        history.push(`/catalog/${category}/${sub}/${brand}`)
    }

    return (
        <div className={classes.navContainer}>
            <div className={classes.container}>
                <Link to="/"><img style={{ width: "200px" }} src={`${process.env.REACT_APP_IMAGES_LOGO}/logo.svg`} /></Link>
                <div className={classes.containerMenu}>
                    <Menu onClick={handleClick} mode="horizontal" className={classes.menuClass}>
                        <SubMenu key="SubMenu" title="Каталог" onTitleClick={handleGoToCatalog}>
                            {/* add category to menu */}
                            {categories.map((c) => {
                                return (
                                    <>
                                        {c.active ? (
                                            <SubMenu
                                                key={c._id}
                                                title={c.name}
                                                style={{ width: "auto" }}
                                                onTitleClick={() => handleGoToCategory(c)}
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
                                                                            onTitleClick={() => handleGoToSub(c.slug, s.slug)}
                                                                        >
                                                                            {brands.map(b => {
                                                                                return (
                                                                                    <>
                                                                                        {
                                                                                            b.active && s._id === b.parent
                                                                                                ?
                                                                                                <Menu.Item
                                                                                                    key={b._id}
                                                                                                    onClick={() => handleGoToBrand(c.slug, s.slug, b.slug)}
                                                                                                // style={{borderTop: "1px solid green"}}
                                                                                                >
                                                                                                    {b.name}
                                                                                                </Menu.Item>
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
                        </SubMenu>
                        <Menu.Item>
                            <Link to='/contacts'>Контакты</Link>
                </Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;
