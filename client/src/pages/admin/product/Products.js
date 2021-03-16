import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getCategories,
} from "../../../functions/category";
import { getBrandPictures } from '../../../functions/uploadImages'
import { getSubs} from '../../../functions/sub'
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined
} from "@ant-design/icons";
import { getBrands } from '../../../functions/brand'
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import _ from 'lodash'
import slugify from 'react-slugify'
import UploadBrandImage from '../../../components/form/UploadBrandPicture'
import { Card, Avatar } from 'antd';
import { createProduct, getProducts } from '../../../functions/product'


const { Meta } = Card;



const Products = () => {
    const [products, setProducts] = useState([])
    const [brandPictures, setBrandPictures] = useState([])
    const [categories, setCategories]=useState([])
    const [subs, setSubs]=useState([])
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
                        .then(res=>{
                            setCategories(res.data)
                            getSubs()
                            .then(res=>{
                                console.log('---------------------',res.data)
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
        return (
            <Card
                style={{ width: 250, margin: "5px", fontSize: "0.8rem" }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" onClick={handleClick} />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >        
                <Meta
                    // style={{fontSize: "0.8rem"}}
                    title={p.name}
                    description={category && sub && `${category.name} ${sub.name}`}
                />
                <br/>
                {path && <img src={`${process.env.REACT_APP_IMAGES_BRAND}/${path.fileName}`} style={{ maxWidth: "50px" }} />}
            </Card>
        )
    }

    const searched = (filter) => (c) => c.name.toLowerCase().includes(filter) ;

    const ReturnProducts = () => (
        <div className=" justify-content-center" style={{ backgroundColor: "White" }}>
            <LocalSearch filter={filter} setFilter={setFilter} />
            <hr/>
            <div className="row justify-content-center">
                {
                    products.length > 0 &&
                    products.filter(searched(filter)).map((p) => {
                        return (
                            ProductCard(p)
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
