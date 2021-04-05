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

const GroupDiscount = ({history, match}) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [groupDiscount, setGroupDiscount] = useState(null)

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        setLoading(true)
        getGroupDiscount(match.params.slug).then(res => {
            setGroupDiscount(res.data)
            setName(res.data.name)
            setLoading(false)
            toast.success('Информация о скидочной группе загружена')
        })
    }, [])

    console.log('group discount', groupDiscount)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateGroupDiscount(match.params.slug,{ name, discounts:groupDiscount.discounts, active: groupDiscount.active }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Скидочная группа обновлена`);
                setName("");
                history.push("/admin/groupDiscounts")
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }


    const ReturnGroupDiscounts = () => {
        return (
            <>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Новое название группы скидок</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            required
                            placeholder="новое название группы скидок"
                            disabled={loading}
                        />
                        <br />
                        <button
                            className="btn btn-outline-primary"
                            disabled={!name || loading}
                        >
                            сохранить
                    </button>
                    </div>
                </form>


            </>
        )
    }

    return (
        <AdminNavigation name={'Скидочные группы'} children={loading ? <Loading /> : ReturnGroupDiscounts()} />
    );
};

export default GroupDiscount;
