import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
} from "../../../functions/category";
import { getBrandPictures } from '../../../functions/uploadImages'
import { getSubs } from '../../../functions/sub'
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    CopyOutlined,
    CheckSquareOutlined
} from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _ from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/ShowBrandPicture'
import { Card, Avatar } from 'antd';
import { createProduct, getProducts } from '../../../functions/product'


const { Meta } = Card;



const Products = () => {
    const [products, setProducts] = useState([])
    const [brandPictures, setBrandPictures] = useState([])
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [filter, setFilter] = useState("");

    const [loading, setLoading] = useState(false)


    // console.log('products:', products)
    // console.log('brand pictures:', brandPictures)
    // console.log('categories:', categories)
    // console.log('subs:', subs)

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




    const ProductCard = (p) => {
        const path = brandPictures.find(b => b.slug === p.brandSlug)
        const category = categories.find(c => c._id === p.category)
        const sub = subs.find(s => s._id === p.sub)
        let pathImage = ''
        if (p.images.length > 0) pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`
        else pathImage = "https://images.neventum.com/2016/62/cayman-logo-alta-01_e776b18a.jpg"
        return (
            <Card
                style={{ width: 250, margin: "5px", fontSize: "0.8rem" }}
                cover={
                    <div style={{ width: "250px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img
                            style={{ maxWidth: "250px", maxHeight:"145px" }}
                            alt="example"
                            src={pathImage}
                        />
                    </div>
                }
                actions={[
                    <CopyOutlined key="setting" onClick={handleClick} className="text-primary"/>,
                    <Link to={`/admin/product/${p.slug}`}><EditOutlined key="edit" className="text-success"/></Link>,
                    <CheckSquareOutlined key="ellipsis" className="text-danger"/>,
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
            <hr />
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
        <AdminNavigation name={'Товары'} children={ReturnProducts()} />
    );
};

export default Products;
