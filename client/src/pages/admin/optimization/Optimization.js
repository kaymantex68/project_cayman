import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNavigation from '../../../components/nav/AdminNavigation'
import { getProducts } from '../../../functions/product'


const Optimization = ({ history }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        getProducts().then(res => setProducts(res.data))
    }, [])


    const ReturnImage = (p) => {

        return (
            <div >
                {p.images.map((image) => (
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center" }}>
                        <img
                                    alt={image}
                                    style={{ maxHeight: "100px", maxWidth:"80px" }}
                                    key={image}
                                    src={`${process.env.REACT_APP_IMAGES_PRODUCTS}/${image}`}
                                    className="m-3"
                                />
                        <span>{image}</span>  
                    </div>
                ))}
            </div>

        )
    }

    const ReturnOptimization = () => {
        return (
            <div className="form-group">
                <label style={{ fontWeight: 'bold' }}>Неиспользуемые картинки</label>
                {products.map(p => {
                    return (
                        <>
                            {p.images.length > 0 && ReturnImage(p)}
                        </>
                    )
                })}

            </div>

        )
    }


    return (
        <AdminNavigation name={'Оптимизация базы данных'} children={ReturnOptimization()} />
    );
};

export default Optimization;