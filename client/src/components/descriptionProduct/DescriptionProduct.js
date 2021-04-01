import React, { useState, useEffect } from 'react'
import NavMenu from '../nav/NavMenu'
import Footer from '../footer/Footer'
import { getProduct } from '../../functions/product'
import classes from './DescriptioProduct.module.css'
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);


const DescriptionProduct = ({ match }) => {
    const [product, setProduct] = useState([])
    const [swiper, setSwiper] = useState([])
    console.log(match.params)
    useEffect(() => {
        getProduct(match.params.name).then(res => {
            setProduct(res.data)
            const slides = [];
            let pathImage;
            if (res.data.images.length>0) {
                for (let i = 0; i < res.data.images.length; i += 1) {
                    pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${res.data.images[i]}`;
                    slides.push(
                        <SwiperSlide key={`descriptionProduct-${i}`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img
                                alt={`${res.data.name}`}
                                src={pathImage}
                                style={{ maxWidth: "60%" }}
                            />
                        </SwiperSlide>
                    );
                }
            } else {
                pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/default.png`;
                slides.push(
                    <SwiperSlide  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img
                            alt={`${res.data.name}`}
                            src={pathImage}
                            style={{ maxWidth: "60%" }}
                        />
                    </SwiperSlide>
                );
            }
            setSwiper([...slides])
        })
    }, [])



    console.log('swiper', swiper)


    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div className={classes.Container} >
                <div className={classes.picturePhoto}>
                    {/*start slider */}
                    <div className={classes.swiperContainer}>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            loop={true}
                            className={classes.Swiper_cont}
                        >
                            {swiper}
                        </Swiper>
                    </div>
                    {/* end slider */}
                </div>

                <div className={classes.descriptionContainer}>
                    <div className={classes.name_coast_container}>
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{product.name}</div>
                        <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Цена: {product.oldCoast? <><span style={{color:"red", textDecoration:"line-through"}}>{product.oldCoast}</span>  <span style={{ fontSize:"1.2rem"}}>{product.coast}</span></> :<span>{product.coast}</span>} руб.</div>
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
                                            <td scope="col" style={{ width: "40%", fontSize: "0.8rem", verticalAlign: "middle", fontWeight:"bold" }}>{product.params[key][0]}</td>
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