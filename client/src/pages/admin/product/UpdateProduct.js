import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
    removeCategory,
    updateCategory,
} from "../../../functions/category";
import { getSubs } from '../../../functions/sub'
import Loading from '../../../components/form/LoadingIcon'
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _, { stubFalse } from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/ShowBrandPicture'
import { Input, Checkbox, Avatar, Badge } from 'antd';
import { createProduct, getProduct, updateProduct, removeFile, uploadImage } from '../../../functions/product'
const { TextArea } = Input;


const UpdateProduct = ({ match, history }) => {
    const [product, setProduct] = useState(null)
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("")
    const [type, setType]=useState("")
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [sub, setSub] = useState('')
    const [brandSlug, setBrandSlug] = useState('')
    const [description, setDescription] = useState('')
    const [sale, setSale] = useState(false)
    const [images, setImages] = useState([])
    const[lider, setLider]=useState(false)
    const [discount, setDiscount] = useState('')
    const [promotion, setPromotion] = useState(false)
    const [params, setParams] = useState({})
    const [number, setNumber] = useState(null)
    const [coast, setCoast] = useState('')
    const [oldCoast, setOldCoast] = useState('')
    const [inStock, setInStock]=useState('')
    const [active, setActive]=useState(null)


    const [files, setFiles] = useState(null)

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([])

    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    // console.log('match', match.params.slug)

    // console.log('name: ', name)
    // console.log('brand: ', brand)
    // console.log('brandSlug:', brandSlug)
    // console.log('category', category)
    // console.log('sub', sub)
    // console.log('description:', description)
    // console.log('sale:', sale)
    // console.log('discount:', discount)
    // console.log('promotion:', promotion)
    // console.log('coast:', coast)
    // console.log('oldCoast:', oldCoast)
    // console.log('params', params)
    // console.log('number', number)
    const loadImage = () => {
        setLoading(true)
        getProduct(match.params.slug)
            .then(res => {
                setProduct(res.data)
                setName(res.data.name)
                setSlug(res.data.slug)
                setType(res.data.type)
                setBrand(res.data.brand)
                setBrandSlug(res.data.brandSlug)
                setCategory(res.data.category)
                setSub(res.data.sub)
                setImages(res.data.images)
                setLider(res.data.lider)
                setDescription(res.data.description)
                setSale(res.data.sale)
                setDiscount(res.data.discount)
                setPromotion(res.data.promotion)
                setParams(res.data.params)
                setCoast(res.data.coast)
                setOldCoast(res.data.oldCoast)
                setInStock(res.data.inStock)
                setActive(res.data.active)
                setNumber(Object.keys(res.data.params).length + 1)
                setLoading(false)
            })
    }

    // console.log('product', product)
    useState(() => {
        setLoading(true)
        getProduct(match.params.slug)
            .then(res => {
                setProduct(res.data)
                setName(res.data.name)
                setSlug(res.data.slug)
                setType(res.data.type)
                setBrand(res.data.brand)
                setBrandSlug(res.data.brandSlug)
                setCategory(res.data.category)
                setSub(res.data.sub)
                setImages(res.data.images)
                setLider(res.data.lider)
                setDescription(res.data.description)
                setSale(res.data.sale)
                setDiscount(res.data.discount)
                setPromotion(res.data.promotion)
                setParams(res.data.params)
                setCoast(res.data.coast)
                setOldCoast(res.data.oldCoast)
                setInStock(res.data.inStock)
                setActive(res.data.active)
                setNumber(Object.keys(res.data.params).length + 1)
                getCategories()
                    .then((res) => {
                        setCategories(res.data)
                        getSubs()
                            .then(res => {
                                setSubs(res.data)
                                getBrands()
                                    .then(res => {
                                        const uniq = [...new Set(Object.keys(res.data).map(key => res.data[key].name))]
                                        setBrands(uniq)
                                        setLoading(false)
                                    })

                            })
                    });
            })
            .catch(err => {
                setLoading(false)
                console.log('err: ', err)
            })
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateProduct(product._id,
            { name, brand, category, sub, description, params, coast, inStock, lider, oldCoast, sale, promotion, discount, active, type }
            , user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Товар "${name}" обновлен`)
                setLoading(false);
                // window.location.reload();
                history.push('/admin/products')
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

    

    const uploadFiles = (e) => {
        const files = e.target.files
        if (files) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                let formData = new FormData()
                formData.append('image', files[i])
                formData.append('name', 'file')
                console.log(formData)
                uploadImage(formData, slug, brandSlug, user.token)
                    .then(res => {
                        console.log('complete upload', res.data)
                        setLoading(false)
                        loadImage()
                    })
                    .catch(err => console.log(err))
            }
        }

    }

    const UploadFile = () => {

        return (
            <>
                <div className="row">
                    {images && images.length > 0
                        ? images.map(image => (
                            <Badge
                                key={image.public_id}
                                count="X"
                                onClick={() => { removeImage(image) }}
                                style={{ cursor: "pointer" }}
                                className="m-3"
                            >
                                <img
                                    alt={image}
                                    style={{ height: "100px" }}
                                    key={image}
                                    src={`${process.env.REACT_APP_IMAGES_PRODUCTS}/${image}`}
                                    className="m-3"
                                />
                            </Badge>
                        ))
                        : <h7 className="m-3 text-danger">нет изображений</h7>
                    }
                </div>
                <label className="btn btn-primary p-0" disabled={!name || loading}>
                    Загрузить изображение
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={uploadFiles}
                        disabled={!name || loading}
                    />
                </label>
            </>
        )
    }

    const removeImage = (image) => {
        setLoading(true)
        removeFile(slug, image, user.token)
            .then(res => {
                console.log(res)
                setLoading(false)
                loadImage()
            })
    }

    const productForm = () => {

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
                        style={{fontSize:"0.9rem"}}
                    />
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Brand</label>
                        <select name="brand" className="form-control" style={{fontSize:"0.9rem"}}
                            onChange={(e) => {
                                setBrand(e.target.value)
                                setBrandSlug(slugify(e.target.value))
                            }}>
                            <option value="all"  >Выберите brand (обязательный пункт)</option>
                            {brands.length > 0 && brands.map((b, index) => {
                                return (
                                    <option key={index}  value={b} selected={b === brand}>
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
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Изображения</label>
                        {UploadFile()}
                    </div>

                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Категория</label>
                        <select name="category" className="form-control" style={{fontSize:"0.9rem"}}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                            {/* <option value="all" >Выберите категорию (обязательный пункт)</option> */}
                            {categories.length > 0 && categories.map((c, index) => {
                                return (
                                    <option key={index} value={c._id} selected={c._id === category}>
                                        {`${c.name}`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Sub-категория</label>
                        <select name="subcategory" className="form-control" style={{fontSize:"0.9rem"}}
                            onChange={(e) => {
                                setSub(e.target.value)
                            }}>
                            {/* <option value="all" >Выберите категорию (обязательный пункт)</option> */}
                            {subs.length > 0 && subs.map((s, index) => {
                                return (
                                    <option key={index} value={s._id} selected={s._id === sub}>
                                        {`${s.name} (${findSubInCategory(s, categories)})`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Описание</label>
                        <TextArea rows={6} value={description} style={{fontSize:"0.8rem"}} onChange={e => setDescription(e.target.value)} />
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
                        <Checkbox onChange={e => setSale(e.target.checked)} checked={sale} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Акция</label>
                        <br />
                        <Checkbox onChange={e => setPromotion(e.target.checked)} checked={promotion} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }} >Цена</label>
                        <input
                            type="text"
                            className="form-control"
                            value={coast}
                            onChange={(e) => setCoast(e.target.value)}
                            placeholder="актуальная цена товара"
                            disabled={loading}
                            style={{fontSize:"0.9rem"}}
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
                            style={{fontSize:"0.9rem"}}
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
                        className="btn btn-outline-primary btn-sm p-3 "
                        disabled={!name || loading}
                        onClick={handleSubmit}
                    >
                        Обновить
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
            {productForm()}
            <hr />

        </div>
    )

    return (
        <AdminNavigation name={'Обновление товара'} children={loading ? <Loading /> : ReturnProduct()} />
    );
};

export default UpdateProduct;
