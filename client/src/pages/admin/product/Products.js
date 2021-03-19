import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
} from "../../../functions/category";
import { getBrandPictures } from '../../../functions/uploadImages'
import { getSubs } from '../../../functions/sub'
import { Link } from "react-router-dom";
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    CopyOutlined,
    CheckSquareOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _, { stubTrue } from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/ShowBrandPicture'
import { Card, Avatar } from 'antd';
import { createProduct, getProducts, removeProduct,updateProduct } from '../../../functions/product'
import Loading from '../../../components/form/LoadingIcon'

const { Meta } = Card;



const Products = () => {
    const [products, setProducts] = useState([])
    const [brandPictures, setBrandPictures] = useState([])
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [filter, setFilter] = useState("");

    const [loading, setLoading] = useState(false)

    const {user}= useSelector(state=>({...state}))

    // console.log('products:', products)
    // console.log('brand pictures:', brandPictures)
    // console.log('categories:', categories)
    // console.log('subs:', subs)

    const loadingProducts=()=>{
        getProducts().then((res)=>setProducts(res.data))
    }

    useState(() => {
        setLoading(true)
        getProducts()
            .then(res => {
                setProducts(res.data)
                getBrandPictures()
                    .then(res => {
                        setBrandPictures(res.data)
                        getCategories()
                            .then(res => {
                                setCategories(res.data)
                                getSubs()
                                    .then(res => {
                                        setSubs(res.data)
                                        setLoading(false)
                                    })
                            })
                    })
            })
            .catch(err => {
                console.log('error: ---->', err)
            })
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        console.log('we here')
    }

    const handleRemove=(p)=>{
        if (window.confirm(`Удалить?`)) {
            setLoading(true)
        removeProduct(p._id,user.token)
        .then(res=>{
            loadingProducts()
            setLoading(false)
            toast.error(`Товар ${p.name} удален!`);
            
        })
        .catch((err) => {
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
        
        console.log('id',p._id)
    }
    }

    const handleActive = (p) => {
        setLoading(true)
        console.log('p',p)
        console.log('active',p.active)
        updateProduct(p._id, { ...p, active: !p.active }, user.token)
            .then(res => {
                loadingProducts();
                setLoading(false)
                toast.success(`Товар ${p.name} переключен`)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }


    const ProductCard = (p) => {
        const path = brandPictures.find(b => b.slug === p.brandSlug)
        const category = categories.find(c => c._id === p.category)
        const sub = subs.find(s => s._id === p.sub)
        let pathImage = ''
        if (p.images.length > 0) pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`
        else pathImage = "/images/product/default.png"
        return (
            <Card
                style={{ width: 250, margin: "5px", fontSize: "0.8rem", boxShadow: "0 3px 2px rgba(0,0,0,0.1)" }}
                cover={
                    <div style={{ width: "250px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img
                            style={{ maxWidth: "200px", maxHeight:"140px" }}
                            alt="example"
                            src={pathImage}
                        />
                    </div>
                }
                actions={[
                    <Link to={`/admin/copy/${p.slug}`}><CopyOutlined key="setting"  className="text-primary"/></Link>,
                    <Link to={`/admin/product/${p.slug}`}><EditOutlined key="edit" className="text-success"/></Link>,
                    <DeleteOutlined key="ellipsis" className="text-danger" onClick={()=>handleRemove(p)}/>,
                    <CheckSquareOutlined key="ellipsis" className={p.active? "text-success" : "text-danger"} onClick={()=>handleActive(p)}/>,
                    
                ]}
              
            >
                <Meta
                    style={{ fontSize: "0.8rem", fontWeight: "bold", color: "black" }}
                    title={p.name}
                    description={category && sub && `${category.name}  (${sub.name})`}
                />
                <br />
                {path &&
                    <div style={{ width: "100px", height: "50px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <img src={`${process.env.REACT_APP_IMAGES_BRAND}/${path.fileName}`} style={{ maxWidth: "100px", maxHeight: "50px" }} />
                    </div>}
            </Card>
        )
    }

    const searched = (filter) => (c) => c.name.toLowerCase().includes(filter);

    

    const ReturnProducts = () => (
        <div className=" justify-content-center" style={{ backgroundColor: "White" }}>
            <LocalSearch filter={filter} setFilter={setFilter} />
            
            <div className="row justify-content-center">
                {
                    products.length > 0 &&
                    products.filter(searched(filter)).map((p) => {
                        return (
                            <div key={p._id}>
                                {ProductCard(p)}
                            </div>
                        )

                    })

                }
            </div>

        </div>
    )

    return (
        <AdminNavigation name={'Товары'} children={loading? Loading() : ReturnProducts()} />
    );
};

export default Products;
