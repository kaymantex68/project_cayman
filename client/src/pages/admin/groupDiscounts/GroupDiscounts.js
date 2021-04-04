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
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import {
    PercentageOutlined,
} from '@ant-design/icons'
import classes from './GroupDiscounts.module.css'
import { Input, Checkbox, Avatar, Badge, Menu } from 'antd';
const { SubMenu, ItemGroup } = Menu;

const GroupDiscount = () => {
    const [loading, setLoading] = useState(false)
    const [groupDiscounts, setGroupDiscounts] = useState([])
    const [brands, setBrands]=useState([])

    const {user}=useSelector(state=>({...state}))

    useEffect(() => {
        setLoading(true)
        getGroupDiscounts().then(res => {
            setGroupDiscounts(res.data)
            getBrandPictures().then(res=>{
                setBrands(res.data)
                setLoading(false)
                toast.success('Информация о скидочных группах загружена')
            })
            
        })
    }, [])

    // console.log('group Discounts', groupDiscounts)

    const handleDiscount=(e,gd,b)=>{
        let discount= e.target.value
        if (discount<0) discount=0
        // console.log('gd', gd.slug)
        // console.log('discount', e.target.value)
        // console.log('brand', b.slug)

        let newGroupDiscount = groupDiscounts.map(g=>{ 
            if (g._id===gd._id) {
                g.discounts[b.slug]=+e.target.value 
                return g
            }
            return g
        })

        // console.log('new', newGroupDiscount)
        setGroupDiscounts(newGroupDiscount)
        let update= newGroupDiscount.find(d=>{
            return(d._id===gd._id)
        })
        updateGroupDiscount(gd.slug, update, user.token).then(res=>{
            toast.success(`скидочная группа "${gd.name}" обновлена`)
        })
    }

    const ReturnGroupDiscounts = () => {
        return (
            <div className="container">
                <Menu className={classes.menu} mode="inline" defaultOpenKeys={[]}>
                    {groupDiscounts.map((gd, index) => {
                        return (
                            <>
                                <SubMenu
                                    key={`${index}_${gd._id}`}
                                    title={
                                        <span style={{ fontSize: "0.9rem", fontWeight:"bold" }}>
                                            <PercentageOutlined />  {gd.name}
                                        </span>
                                    }
                                    className="container"
                                >
                                    <div className="mt-3">
                                        {brands.map(b => {
                                            // console.log('gd',gd.discounts[b.slug])
                                            return (
                                                <div key={b._id}>
                                                    <div className="ml-4" style={{ display: "flex", alignItems: "center" }}>
                                                        <span style={{ backgroundColor: "yellow", fontSize: "1rem", flex: "2", fontWeight: "bold", minWidth: "200px" }}>{b.name}</span>
                                                        <input
                                                            className="ml-2 form-control text-center"
                                                            type="number"
                                                            value={gd && gd.discounts[b.slug] ? gd.discounts[b.slug] : 0}
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
        )
    }

    return (
        <AdminNavigation name={'Скидочные группы'} children={loading ? <Loading /> : ReturnGroupDiscounts()} />
    );
};

export default GroupDiscount;
