import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


const CategoryUpdate = ({history, match }) => {
    const [name, setName] = useState('')
    const [turn, setTurn] = useState('')
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))


    useEffect(() => {
        getCategory(match.params.slug)
            .then(res => {
                setName(res.data.category.name)
                setTurn(res.data.category.turn)
            })

    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(match.params.slug)
        updateCategory(match.params.slug, { name, turn }, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Категория ${name} с номером ${turn} обновлена`)
                history.push('/admin/category')
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
                        placeholder="новое название категории"
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

    return (
        <div className="container-fluid" style={{ minHeight: "1250px" }}>
            <div className="row">
                <div className="colmd-2" style={{ minHeight: "1250px" }}>
                    <AdminNav />
                </div>
                <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
                    {loading ? <h6><LoadingOutlined /></h6> : <h6>Обновление категории</h6>}
                    <br />
                    {updateCategoryForm()}
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;