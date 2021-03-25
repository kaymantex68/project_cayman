import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
    removeCategory,
    updateCategory,
} from "../../../functions/category";
import {getSubs} from '../../../functions/sub'
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
    const [type, setType]=useState("")
    const [brandSlug, setBrandSlug] = useState('')
    const [category, setCategory] = useState('')
    const [sub, setSub] = useState('')
    const [description, setDescription] = useState('')
    const [lider, setLider]=useState(false)
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
    const [subs, setSubs] = useState([]);

    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));


    console.log('name: ', name)
    console.log('brand: ', brand)
    console.log('brandSlug:', brandSlug)
    console.log('category: ', category)
    console.log('sub: ', sub)
    console.log('description:', description)
    console.log('sale:', sale)
    console.log('discount:', discount)
    console.log('promotion:', promotion)
    console.log('coast:', coast)
    console.log('oldCoast:', oldCoast)
    console.log('params', params)

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
                getCategories().then((res) => {
                    setCategories(res.data)
                    getSubs().then(res=>setSubs(res.data))
                })
            })
            .catch(err => {
                toast.error(err.data.message)
                console.warn('err', err)
            })
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct({ name, brand, category, sub, type, lider, description, params, coast, oldCoast, sale, promotion, discount }, user.token)
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

    // compare and find parent
    const findSubInCategory = (_sub, _categories) => {
        return _categories.find(_c => {
            return _c._id === _sub.parent
        })
            ? _categories.find(_c => {
                return _c._id === _sub.parent
            }).name
            : 'категория не найдена'
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
                    <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Тип</label>
                    <input
                        type="text"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="тип товара"
                        disabled={loading}
                        style={{fontSize:"0.9rem"}}
                    />
                    </div>
                    <UploadBrandImage name={brand} disabled={false} />
                    <br />
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Категория</label>
                        <select name="category" className="form-control"
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                            <option value="all" >Выберите категорию (обязательный пункт)</option>
                            {categories.length > 0 && categories.map((c, index) => {
                                return (
                                    <option key={index} value={c._id} >
                                        {`${c.name}`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Sub-категория</label>
                        <select name="subcategory" className="form-control"
                            onChange={(e) => {
                                setSub(e.target.value)
                            }}>
                            <option value="all" >Выберите категорию (обязательный пункт)</option>
                            {subs.length > 0 && subs.map((s, index) => {
                                return (
                                    <option key={index} value={s._id} >
                                        {`${s.name} (${findSubInCategory(s, categories)})`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Описание</label>
                        <TextArea rows={4} value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Лидер</label>
                        <br />
                        <Checkbox onChange={e => setLider(e.target.checked)} checked={lider} />
                    </div>
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
                                        <span className="input-group-text" style={{fontSize:"0.8rem"}}>{key}</span>
                                        <input name={key} style={{fontSize:"0.8rem"}} placeholder="параметр" className="form-control mr-4 ml-2" value={params[key][0]} onChange={handleChange1} />
                                        <input name={key} style={{fontSize:"0.8rem"}} placeholder="значение" className="form-control mr-4" value={params[key][1]} onChange={handleChange2} />
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
        <div className="col md-5" style={{ backgroundColor: "white" }}>
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
           
        </div>
    )

    return (
        <AdminNavigation name={'Новый товар'} children={ReturnProduct()} />
    );
};

export default NewProduct;
