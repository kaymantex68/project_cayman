import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSubs } from '../../../functions/sub'
import Loading from '../../../components/form/LoadingIcon'
import { LoadingOutlined, PercentageOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _, { stubFalse } from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/ShowBrandPicture'
import { Input, Checkbox, Avatar, Badge, Menu } from 'antd';
import { getUser } from '../../../functions/user'
import { getBrandPictures } from '../../../functions/uploadImages'
import { addToDiscounts, getUserDiscounts } from '../../../functions/discounts'
import classes from './UserDescription.module.css'

const { TextArea } = Input;
const { SubMenu, ItemGroup } = Menu;

const UserDescription = ({ match, history }) => {
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState({})
    const [brands, setBrands] = useState([])
    const [discount, setDiscount] = useState({})
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        setLoading(true)
        getUser(match.params._id, user.token).then(res => {
            setCustomer(res.data)
            setDiscount(res.data.discounts)
            getBrandPictures().then(res => {
                setBrands(res.data)
                toast.success(`Информация о пользователе "${match.params._id}" загружена`)
                setLoading(false)
            })
        })
    }, [])

    // console.log('user discount', discount)

    const handleDiscount = async (e, b) => {
        // console.log('brand', b.slug)
        // console.log(e.target.value)
        const newDiscount = { ...discount }
        newDiscount[b.slug] = {
            discount: e.target.value,
            active: true
        }
        setDiscount({ ...newDiscount })
        await addToDiscounts(match.params._id, newDiscount, user.token).then(res => {
            toast.success('Персональная скидка обновлена')
            // console.log(res.data)
        })
    }


    // console.log('brands', brands)
    const userForm = () => {
        return (
            <div style={{ color: "black" }}>
                <div>email: {customer.email}</div>
                <div>имя: {customer.name}</div>
                <div>роль: {customer.role}</div>
                <br />
                <hr />
                <Menu className={classes.menu} mode="inline" defaultOpenKeys={[]}>

                    <SubMenu
                        key="1"
                        title={
                            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                                <PercentageOutlined />  Скидки <span style={{ fontSize: "0.7rem" }}>(выставляются в процентах)</span>
                            </span>
                        }
                        className="container"
                    >
                        <div className="mt-3">
                            {brands.map(b => {
                                let slug=b.slug
                                // if (discount && discount[slug]) console.log(slug,' ',discount[slug]["discount"])
                                
                                return (
                                    <>
                                        <div className="ml-4" style={{ display: "flex", alignItems: "center" }} key={b._id}>
                                            <span style={{ backgroundColor: "yellow", fontSize: "1rem", flex: "2", fontWeight: "bold", minWidth: "200px" }}>{b.name}</span>
                                            <input
                                                className="ml-2 form-control text-center"
                                                type="number"
                                                value={discount && discount[slug]? discount[slug]["discount"] : 0}
                                                style={{ flex: "6" }}
                                                onChange={(e) => handleDiscount(e, b)}
                                            />
                                        </div>
                                        {/* <hr /> */}
                                    </>
                                )
                            })}
                        </div>
                    </SubMenu>
                    <hr/>
                    <SubMenu
                        key="2"
                        title={
                            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                                <PercentageOutlined />  Корзина </span>
                        }
                        className="container"
                    ></SubMenu>
                </Menu>
            </div>
        )
    }




    const ReturnUser = () => (
        <div className="col md-5" style={{ backgroundColor: "white" }}>

            <br />
            {userForm()}
            <hr />
        </div>
    )

    return (
        <AdminNavigation name={'Пользователь'} children={loading ? <Loading /> : ReturnUser()} />
    );
};

export default UserDescription;
