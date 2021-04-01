import React, { useState, useEffect } from 'react'
import NavMenu from '../nav/NavMenu'
import Footer from '../footer/Footer'
import { getProduct } from '../../functions/product'
import classes from './DescriptioProduct.module.css'

const DescriptionProduct = ({ match }) => {
    const [product, setProduct] = useState([])
    console.log(match.params)
    useEffect(() => {
        getProduct(match.params.name).then(res => {
            setProduct(res.data)
        })
    }, [])
    console.log('product', product)
    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div className={classes.Container} >
                <div className={classes.picturePhoto}></div>

                <div className={classes.descriptionContainer}>
                    <div className={classes.name_coast_container}>
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{product.name}</div>
                        <div style={{ fontSize: "1rem", fontWeight:"bold" }}>Цена: {product.coast} руб.</div>
                    </div>
                    <hr />
                    <div>
                        <table className="table table-hover table-sm table-striped">
                            <thead className="thead-dark text-center">
                                <tr>
                                    <th scope="col" style={{ width: "40%", fontSize: "0.9rem", verticalAlign: "middle" }}>Характеристика</th>
                                    <th scope="col" style={{ width: "10%", fontSize: "0.9rem", verticalAlign: "middle" }}></th>
                                    <th scope="col" style={{ width: "50%", fontSize: "0.9rem", verticalAlign: "middle" }}>Значение</th>
                                </tr>
                            </thead>
                            <tbody className="text-center ">
                                {product.params && Object.keys(product.params).map((key, index) => {

                                    return (
                                        <tr>
                                            <td scope="col" style={{ width: "40%", fontSize: "0.8rem", verticalAlign: "middle" }}>{product.params[key][0]}</td>
                                            <td scope="col" style={{ width: "10%", fontSize: "0.8rem", verticalAlign: "middle" }}></td>
                                            <td scope="col" style={{ width: "50%", fontSize: "0.8rem", verticalAlign: "middle" }}>{product.params[key][1]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table >

                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default DescriptionProduct