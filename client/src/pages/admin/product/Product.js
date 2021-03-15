import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
    removeCategory,
    updateCategory,
} from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _ from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/UploadBrandPicture'
import { Input, Checkbox } from 'antd';
const { TextArea } = Input;


const Product = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState('')
    const [brandSlug, setBrandSlug] = useState('')
    const [description, setDescription] = useState('')
    const [sale, setSale] = useState(false)
    const [stock, setStock] = useState(false)
    const [coast, setCoast] = useState('')
    const [oldCoast, setOldCoast] = useState('')

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([]);
    // filter step 1
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));


    console.log('name: ', name)
    console.log('brand: ', brand)
    console.log('brandSlug:', brandSlug)
    console.log('description:', description)
    console.log('sale:', sale)

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    useState(() => {
        // loadCategories();
        getBrands()
            .then(res => {
                const uniq = [...new Set(Object.keys(res.data).map(key => res.data[key].name))]
                setBrands(uniq)
            })
            .catch(err => {
                console.warn('err', err)
            })
    }, []);



    const handleSubmit = (e) => {
        // e.preventDefault();
        // setLoading(true);
        // createCategory({ name, turn }, user.token)
        //     .then((res) => {
        //         setLoading(false);
        //         toast.success(`Категория ${name} с номером ${turn} создана`);
        //         setName("");
        //         setTurn("");
        //         loadCategories();
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         if (err.response.status === 400) toast.error(err.response.data);
        //     });
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
                    <label style={{ fontWeight: 'bold' }}>Название нового товара</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название товара"
                        disabled={loading}
                    />
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Brand</label>
                        <select name="brand" className="form-control"
                            onChange={(e) => {
                                setBrand(e.target.value)
                                setBrandSlug(slugify(e.target.value))
                            }}>
                            <option value="all">Выберите brand (обязательный пункт)</option>
                            {brands.length > 0 && brands.map((b, index) => {
                                return (
                                    <option key={index} value={b}>
                                        {`${b}`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <UploadBrandImage name={brand} disabled={false} />
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Описание</label>
                        <TextArea rows={4} value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Распродажа</label>
                        <br />
                        <Checkbox onChange={e => setSale(e.target.checked)} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Акция</label>
                        <br />
                        <Checkbox onChange={e => setStock(e.target.checked)} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Цена</label>
                        <input
                            type="text"
                            className="form-control"
                            value={coast}
                            onChange={(e) => setCoast(e.target.value)}
                            placeholder="актуальная цена товара"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Старая цена</label>
                        <input
                            type="text"
                            className="form-control"
                            value={oldCoast}
                            onChange={(e) => setOldCoast(e.target.value)}
                            placeholder="старая цена товара"
                            disabled={loading}
                        />
                    </div>
                    <br/>
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

    const ReturnProduct = () => (
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
        <AdminNavigation name={'Новый товар'} children={ReturnProduct()} />
    );
};

export default Product;
