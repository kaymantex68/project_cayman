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
import UploadBrandImage from '../../../components/form/ShowBrandPicture'
import { Input, Checkbox } from 'antd';
import { createProduct } from '../../../functions/product'
const { TextArea } = Input;


const NewProduct = ({history}) => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState('')
    const [brandSlug, setBrandSlug] = useState('')
    const [description, setDescription] = useState('')
    const [sale, setSale] = useState(false)
    const [discount, setDiscount] = useState('')
    const [promotion, setPromotion] = useState(false)
    const [params, setParams] = useState({
        1: ['', ''],
        2: ['', ''],
    })
    const [number, setNumber] = useState(null)
    const [coast, setCoast] = useState('')
    const [oldCoast, setOldCoast] = useState('')

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([]);

    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));


    // console.log('name: ', name)
    // console.log('brand: ', brand)
    // console.log('brandSlug:', brandSlug)
    // console.log('description:', description)
    // console.log('sale:', sale)
    // console.log('discount:', discount)
    // console.log('promotion:', promotion)
    // console.log('coast:', coast)
    // console.log('oldCoast:', oldCoast)
    // console.log('params', params)

    useState(() => {
        setNumber(Object.keys(params).length + 1)
    }, [])

    
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
                toast.error(err.data.message)
                console.warn('err', err)
            })
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct({ name, brand, description, params, coast, oldCoast, sale, promotion, discount }, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Новый товар "${name}" создан`)
                setLoading(false);
                history.push("/admin/products")
            })
            .catch(err => {
                if (err.response.status === 400) toast.error(err.response.data);
                if (err.response.status === 401) toast.error(err.response.data);
                setLoading(false)
            })
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

    const handleChange1 = (e) => {
        let arr = [...params[e.target.name]]
        arr[0] = e.target.value
        setParams({ ...params, [e.target.name]: arr })
    }

    const handleChange2 = (e) => {
        let arr = [...params[e.target.name]]
        arr[1] = e.target.value
        setParams({ ...params, [e.target.name]: arr })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setNumber(number + 1)
        setParams({ ...params, [number]: '' })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if (e.target.name !== '1' && e.target.name !== '2') {
            let NewObject = { ...params }
            delete NewObject[e.target.name]
            setParams({ ...NewObject })
        }
        else {
            toast.warning('Поле 1 и 2 являются обязательными. Их нельзя удалить!')
        }

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
                        <Checkbox onChange={e => setPromotion(e.target.checked)} />
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
                    <br />
                    <label style={{ fontWeight: 'bold' }}>Характеристики товара</label>
                    <div className="container-fluid">
                        {params &&
                            Object.keys(params).map(key => {
                                return (
                                    <div class="input-group-prepend">
                                        <span className="input-group-text">{key}</span>
                                        <input name={key} placeholder="параметр" className="form-control mr-4 ml-2" value={params[key][0]} onChange={handleChange1} />
                                        <input name={key} placeholder="значение" className="form-control mr-4" value={params[key][1]} onChange={handleChange2} />
                                        <button
                                            type="button"
                                            name={key}
                                            className="btn btn-outline-danger btn-sm ml-1"
                                            onClick={handleDelete}
                                        >удалить поле</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={handleAdd}>добавить поле</button>
                    <hr />
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm p-1 "
                        disabled={!name || loading}
                        onClick={handleSubmit}
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

export default NewProduct;
