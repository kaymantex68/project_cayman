import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
    createCategory,
    removeCategory,
    updateCategory,
} from "../../../functions/category";
import Loading from '../../../components/form/LoadingIcon'
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const [turn, setTurn] = useState("");
    const [categories, setCategories] = useState([]);
    // filter step 1
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    useState(() => {
        loadCategories();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name, turn }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Категория ${name} с номером ${turn} создана`);
                setName("");
                setTurn("");
                loadCategories();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = (slug, name, turn) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Категория ${name} с номером ${turn} удалена!`);
                    loadCategories();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };

    const handleActive = (c) => {
        setLoading(true)
        updateCategory(c.slug, { name: c.name, turn: c.turn, active: !c.active }, user.token)
            .then(res => {
                setLoading(false)
                // toast.success(`Категория ${c.name} с номером ${c.turn} переключена`)
                loadCategories();
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const searched = (filter) => (c) => c.name.toLowerCase().includes(filter);

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Название новой категории</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название категории"
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
                        disabled={!name || loading}
                    >
                        Добавить
                    </button>
                </div>
            </form>
        );
    };

    const ReturnCategory = () => (
        <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
            {/* {loading ? (
                <h6>
                    <LoadingOutlined />
                </h6>
            ) : (
                <h6>Управление "Категориями"</h6>
            )} */}
            <br />
            {categoryForm()}
            <hr />
            <LocalSearch filter={filter} setFilter={setFilter} />
            {categories.filter(searched(filter)).map((c) => {
                return (
                    <div className="alert alert-primary " key={c._id}>
                        {`${c.name}`}
                        <Link
                            className="btn btn-sm float-right"
                            to={`/admin/category/${c.slug}`}
                        >
                            <EditOutlined />
                        </Link>
                        <span
                            className="btn btn-sm float-right"
                            onClick={() => handleRemove(c.slug, c.name, c.turn)}
                        >
                            <DeleteOutlined className="text-danger" />
                        </span>
                        <span
                            className="btn btn-sm float-right"
                            onClick={() => handleActive(c)}
                        >
                            <CheckSquareOutlined className={c.active ? "text-success" : "text-danger"} />
                        </span>
                        <span className="float-right btn btn-sm ">{`${c.turn}`}</span>
                    </div>
                );
            })}
        </div>
    )

    return (
        <AdminNavigation name={'Категории'} children={loading ? <Loading /> : ReturnCategory()} />
    );
};

export default CategoryCreate;
