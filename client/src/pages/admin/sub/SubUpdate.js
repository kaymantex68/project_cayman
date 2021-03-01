import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories} from '../../../functions/category'
import { getSub, updateSub} from '../../../functions/sub'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


const SubUpdate = ({history, match }) => {
    const [name, setName] = useState('')
    const [turn, setTurn] = useState('')
    const [parent, setParent]=useState('')
    const [categories, setCategories] = useState([])
    const [sub, setSub]=useState('')


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
            })

    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params._id, { name, parent, turn }, user.token)
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
    return (
        <div className="container-fluid" style={{ minHeight: "1250px" }}>
            <div className="row">
                <div className="colmd-2" style={{ minHeight: "1250px" }}>
                    <AdminNav />
                </div>
                <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
                    {loading ? <h6><LoadingOutlined /></h6> : <h6>Обновление Sub-категории</h6>}
                    <br />
                    <div className="form-group">
                        <label>Родительская категория</label>
                        <select name="category" className="form-control"  onChange={(e) => setParent(e.target.value)}>
                            <option>выберите категорию</option>
                            {categories.length > 0 && categories.map(c => {
                                return <option key={c._id} value={c._id} selected={c._id===parent}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    {updateCategoryForm()}
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;