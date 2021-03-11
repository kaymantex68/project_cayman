import React, { useState, useEffect, useCallback } from "react";

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/sub'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AdminNavigation from '../../../components/nav/AdminNavigation'

const SubUpdate = ({ history, match }) => {
    const [name, setName] = useState('')
    const [turn, setTurn] = useState('')
    const [active, setActive]= useState(false)
    const [parent, setParent] = useState('')
    const [categories, setCategories] = useState([])
    const [sub, setSub] = useState('')


    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };


    useEffect(() => {
        loadCategories()
        getSub(match.params._id)
            .then(res => {
                setParent(res.data.sub.parent)
                setName(res.data.sub.name)
                setTurn(res.data.sub.turn)
                setActive(res.data.sub.active)
            })

    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params._id, { name, parent, turn, active }, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Категория ${name} с номером ${turn} обновлена`)
                history.push('/admin/sub')
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }


    const updateCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Новое название категории</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="новое название Sub-категории"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={turn}
                        onChange={e => setTurn(e.target.value)}
                        required
                        placeholder="новый порядковый номер в навигационной панели (число)"
                        disabled={loading}
                    />
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || loading}
                    >Обновить</button>
                </div>
            </form>
        )
    }

    const ReturnUpdateSubForm = () => (
        <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
            <div className="form-group">
                <label>Родительская категория</label>
                <select name="category" className="form-control" onChange={(e) => setParent(e.target.value)}>
                    <option>выберите категорию</option>
                    {categories.length > 0 && categories.map(c => {
                        return <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                    })}
                </select>
            </div>
            {updateCategoryForm()}
        </div>
    )

    return (
        <AdminNavigation name="Обновить Sub-категорию" children={ReturnUpdateSubForm()} />
    );
};

export default SubUpdate;