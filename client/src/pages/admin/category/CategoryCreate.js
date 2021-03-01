import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories, createCategory, removeCategory } from '../../../functions/category'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'



const CategoryCreate = () => {
    const [name, setName] = useState('')
    const [turn, setTurn] = useState('')
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))

    const loadCategories = () => {
        getCategories().then(res => setCategories(res.data))
    }

    useState(() => {
        loadCategories()
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({ name, turn }, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Категория ${name} с номером ${turn} создана`)
                setName('')
                setTurn('')
                loadCategories()
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = (slug,name,turn) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true)
            removeCategory(slug,user.token)
                .then(res => {
                    setLoading(false)
                    toast.warning(`Категория ${name} с номером ${turn} удалена!`)
                    loadCategories()}
                )
                .catch(err => {
                    setLoading(false)
                    if (err.response.status === 400) toast.error(err.response.data)
                })
        }
    }

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название новой категории</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название категории"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={turn}
                        onChange={e => setTurn(e.target.value)}
                        required
                        placeholder="порядковый номер в навигационной панели (число)"
                        disabled={loading}
                    />
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || loading}
                    >Добавить</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid" style={{ minHeight: "1250px" }}>
            <div className="row">
                <div className="colmd-2" style={{ minHeight: "1250px" }}>
                    <AdminNav />
                </div>
                <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
                    {loading ? <h6><LoadingOutlined /></h6> : <h6>Управление "Категориями"</h6>}
                    <br />
                    {categoryForm()}
                    {categories.map(c => {
                        return (
                            <div
                                class="alert alert-primary "
                                key={c._id}>
                                {`${c.name}`}
                                <Link className="btn btn-sm float-right" to={`/admin/category/${c.slug}`}><EditOutlined /></Link>
                                <span className="btn btn-sm float-right" onClick={() => handleRemove(c.slug,c.name, c.turn)}><DeleteOutlined className="text-danger" /></span>
                                <span className="float-right btn btn-sm ">{`${c.turn}`}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
