import React, { useState, useEffect } from "react";
import {
    getProducts,
    getProductsFromCategory,
    getProductsFilter,
} from "../functions/catalog";
import { getCategory } from "../functions/category";
import { getSubsSlug } from "../functions/sub";
import SubUpdate from "./admin/sub/SubUpdate";
import Loading from "../components/form/LoadingIcon";
import NavMenu from "../components/nav/NavMenu";
import ProductCard from '../components/card/ProductCard'


const Catalog = ({ match, history }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { params } = match;
    const { brand, sub, category } = match.params;

    // console.log('products', products)
    // console.log(match)
    // console.log('history', history)

    useEffect(() => {
        setLoading(true);
        if (brand) {
            setProducts([]);
            let catObject;
            let subArray;
            setProducts([]);
            getCategory(category)
                .then((res) => {
                    catObject = { ...res.data.category };
                    getSubsSlug(sub).then((res) => {
                        subArray = [...res.data];
                        const subObject = subArray.find((s) => s.parent === catObject._id);
                        // we need to get Products with two parametrs category._id and
                        // sub._id
                        //------------------------------------------>
                        // console.log('category +++++++++', catObject)
                        // console.log('sub +++++++++', subObject)
                        getProductsFilter(catObject._id, subObject._id, brand).then(
                            (res) => {
                                setProducts(res.data);
                                setLoading(false);
                            }
                        );
                    });
                })
                .catch((err) => {
                    console.log("err get category--------->", err);
                    setLoading(false);
                });
        } else if (sub) {
            let catObject;
            let subArray;
            setProducts([]);
            getCategory(category)
                .then((res) => {
                    catObject = { ...res.data.category };
                    getSubsSlug(sub).then((res) => {
                        subArray = [...res.data];
                        const subObject = subArray.find((s) => s.parent === catObject._id);
                        // we need to get Products with two parametrs category._id and
                        // sub._id
                        //------------------------------------------>
                        // console.log('category +++++++++', catObject)
                        // console.log('sub +++++++++', subObject)
                        getProductsFilter(catObject._id, subObject._id).then((res) => {
                            setProducts(res.data);
                            setLoading(false);
                        });
                    });
                })
                .catch((err) => {
                    console.log("err get category--------->", err);
                    setLoading(false);
                });
        } else if (category) {
            setProducts([]);
            getCategory(category)
                .then((res) => {
                    getProductsFilter(res.data.category._id).then((res) => {
                        setProducts(res.data);
                        setLoading(false);
                    });
                })
                .catch((err) => {
                    console.log("err get category--------->", err);
                    setLoading(false);
                });
        } else if (!brand && !sub && !category) {
            // console.log('catalog')
            getProductsFilter()
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("err--------->", err);
                    setLoading(false);
                });
        }
    }, [params]);

    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div className="container-fluid" >
                {loading ? (
                    <Loading />
                ) : (
                    <div className="row justify-content-center" style={{padding: "10px 0 0 0"}}>
                        {products.map((p) => {
                            return (
                                <ProductCard product={p}/>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Catalog;
