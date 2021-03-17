import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getSubs,
    createSub,
    removeSub,
    updateSub
} from "../../../functions/sub";
import {
    getCategories,
} from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined,CheckSquareOutlined } from "@ant-design/icons";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'

const SubCreate = () => {
    const [name, setName] = useState("");
    const [turn, setTurn] = useState("");
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState('all')
    const [categories, setCategories] = useState([])
    // filter step 1
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    console.log('parrent category', category)

    const loadSubCategories = () => {
        getSubs().then((res) => setSubs(res.data));
    };

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    useState(() => {
        loadSubCategories();
        loadCategories()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent: category, turn }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Категория ${name} с номером ${turn} создана`);
                setName("");
                setTurn("");
                loadSubCategories();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = (_id, name, turn) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeSub(_id, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Sub-категория ${name} с номером ${turn} удалена!`);
                    loadSubCategories();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };

    const handleActive =(s)=>{
        setLoading(true)
        updateSub(s._id, { name: s.name, turn: s.turn, parent: s.parent, active: !s.active }, user.token)
        .then(res => {
            setLoading(false)
            // toast.success(`Категория ${c.name} с номером ${c.turn} переключена`)
            loadSubCategories();
        })
        .catch(err => {
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })     
    }



    const searched = (filter) => (c) => {
        if (c.parent === category)  return c.name.toLowerCase().includes(filter)
    
        if (category === 'all') return c.name.toLowerCase().includes(filter)
        
    };

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название новой Sub-категории</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название Sub-категории"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={turn}
                        onChange={(e) => setTurn(e.target.value)}
                        required
                        placeholder="порядковый номер в навигационной панели (число)"
                        disabled={loading}
                    />
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || !category || !turn || loading}

                    >
                        Добавить
          </button>
                </div>
            </form>
        );
    };

    const ReturnSubCategory=()=>(
        <div className="col md-5" style={{ backgroundColor: "white" }}>
                    <div className="form-group">
                        <label>Родительская категория</label>
                        <select name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">Выберите родительскую категорию (обязательный пункт)</option>
                            {categories.length > 0 && categories.map(c => {
                                return <option key={c._id} value={c._id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    {categoryForm()}
                    <hr />

                    <LocalSearch filter={filter} setFilter={setFilter} />

                    {subs.filter(searched(filter)).map((s) => {
                        let filterCategory = categories.find(cat => {
                            return cat._id === s.parent
                        })
                        // filterCategory ? console.log(filterCategory) : console.log('(категория отсутствует)')
                        return (
                            <div className="alert alert-primary " key={s._id}>
                                {`${s.name}`}
                                <Link
                                    className="btn btn-sm float-right"
                                    to={`/admin/sub/${s._id}`}
                                >
                                    <EditOutlined />
                                </Link>
                                <span
                                    className="btn btn-sm float-right"
                                    onClick={() => handleRemove(s._id, s.name, s.turn)}
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <span className="float-right btn btn-sm ">{`${s.turn}`}</span>
                                <span
                                    className="btn btn-sm float-right"
                                    onClick={() => handleActive(s)}
                                >
                                    <CheckSquareOutlined className={s.active? "text-success" : "text-danger"} />
                                </span>
                                <span className="float-right btn btn-sm ">
                                    {
                                        filterCategory ? filterCategory.name : '(категория отсутствует)'
                                    }
                                </span>
                            </div>
                        );
                    })}
                </div>
    )


    return (
        <AdminNavigation name="Sub-категории" children={ReturnSubCategory()}/>  
    );
};

export default SubCreate;
