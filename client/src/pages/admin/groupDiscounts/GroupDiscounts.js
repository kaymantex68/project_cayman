import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getGroupDiscount,
    getGroupDiscounts,
    createGroupDiscount,
    removeGroupDiscount,
    updateGroupDiscount,
} from "../../../functions/groupDiscount";
import { getBrandPictures } from '../../../functions/uploadImages'
import Loading from '../../../components/form/LoadingIcon'
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import {
    PercentageOutlined,
    CheckSquareOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import classes from './GroupDiscounts.module.css'
import { Input, Checkbox, Avatar, Badge, Menu } from 'antd';
const { SubMenu, ItemGroup } = Menu;

const GroupDiscount = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [groupDiscounts, setGroupDiscounts] = useState([])
    const [brands, setBrands] = useState([])

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        setLoading(true)
        getGroupDiscounts().then(res => {
            setGroupDiscounts(res.data)
            getBrandPictures().then(res => {
                setBrands(res.data)
                setLoading(false)
                toast.success('Информация о скидочных группах загружена')
            })
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createGroupDiscount({ name, discounts: {} }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Скидочная группа ${name} создана`);
                setName("");
                getGroupDiscounts().then(res => {
                    setGroupDiscounts(res.data)
                    getBrandPictures().then(res => {
                        setBrands(res.data)
                        setLoading(false)
                        toast.success('Информация о скидочных группах загружена')
                    })
                })
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const handleDiscount = (e, gd, b) => {
        let discount = e.target.value
        if (discount < 0) discount = 0
        console.log('gd', gd.slug)
        console.log('discount', e.target.value)
        console.log('brand', b.slug)
        let newGroupDiscount = groupDiscounts.map(g => {
            if (g._id === gd._id) {
                if (!g.discounts) g.discounts = {}
                g.discounts[b.slug] = {discount: +e.target.value, active: true}
                
                return g
            }
            return g
        })
        // console.log('new', newGroupDiscount)
        setGroupDiscounts(newGroupDiscount)
        let update = newGroupDiscount.find(d => {
            return (d._id === gd._id)
        })
        updateGroupDiscount(gd.slug, update, user.token).then(res => {
            toast.success(`Cкидочная группа "${gd.name}" обновлена`)
        })
    }

    const handleActive = (e, gd) => {
        // console.log('gd', gd.slug)
        // console.log('discount', e.target.value)
        // console.log('brand', b.slug)
        let newGroupDiscount = groupDiscounts.map(g => {
            if (g._id === gd._id) {
                g.active = !g.active
                return g
            }
            return g
        })
        console.log('new', newGroupDiscount)
        setGroupDiscounts(newGroupDiscount)
        let update = newGroupDiscount.find(d => {
            return (d._id === gd._id)
        })
        updateGroupDiscount(gd.slug, update, user.token).then(res => {
            toast.success(`Активация "${gd.name}" обновлена`)
        })
    }


    const handleRemove = (slug, name,) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeGroupDiscount(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Скидочная группа ${name} удалена!`);
                    getGroupDiscounts().then(res => {
                        setGroupDiscounts(res.data)
                        getBrandPictures().then(res => {
                            setBrands(res.data)
                            setLoading(false)
                            toast.success('Информация о скидочных группах загружена')
                        })
                    })
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };

    const ReturnGroupDiscounts = () => {
        return (
            <>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Название новой группы скидок</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            required
                            placeholder="название группы скидок"
                            disabled={loading}
                        />
                        <br />
                        <button
                            className="btn btn-outline-primary"
                            disabled={!name || loading}
                        >
                            Добавить
                    </button>
                    </div>
                </form>

                <div className="container">
                    <Menu className={classes.menu} mode="inline" defaultOpenKeys={[]}>
                        {groupDiscounts.map((gd, index) => {
                            return (
                                <>
                                    <CheckSquareOutlined
                                        className={gd.active ? "text-success" : "text-danger "}
                                        onClick={(e) => handleActive(e, gd)}
                                    />
                                    <Link
                                        className="btn btn-sm"
                                        to={`/admin/groupDiscount/${gd.slug}`}
                                    >
                                        <EditOutlined />
                                    </Link>
                                    <span
                                        className="btn btn-sm"
                                        onClick={() => handleRemove(gd.slug, gd.name)}
                                    >
                                        <DeleteOutlined className="text-danger" />
                                    </span>
                                    <SubMenu
                                        key={`${index}_${gd._id}`}
                                        title={
                                            <>
                                                <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                                                    <PercentageOutlined />  {gd.name}
                                                </span>

                                            </>
                                        }
                                        className="container"
                                    >
                                        <div className="mt-3">
                                            {brands.map(b => {
                                            
                                                return (
                                                    <div key={b._id}>
                                                        <div className="ml-4" style={{ display: "flex", alignItems: "center" }}>
                                                            <span style={{ backgroundColor: "yellow", fontSize: "1rem", flex: "2", fontWeight: "bold", minWidth: "200px" }}>{b.name}</span>
                                                            <input
                                                                className="ml-2 form-control text-center"
                                                                type="number"
                                                                value={!!gd && !!gd["discounts"] && !!gd["discounts"][b.slug] && !!gd["discounts"][b.slug]["discount"] ? gd["discounts"][b.slug]["discount"] : 0}
                                                                style={{ flex: "6" }}
                                                                onChange={(e) => handleDiscount(e, gd, b)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </SubMenu>
                                    <hr />
                                </>

                            )
                        })}
                    </Menu>
                </div>
            </>
        )
    }

    return (
        <AdminNavigation name={'Скидочные группы'} children={loading ? <Loading /> : ReturnGroupDiscounts()} />
    );
};

export default GroupDiscount;
