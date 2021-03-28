import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import ProductCard from '../../components/card/ProductCard'
import {getProducts} from '../../functions/product'
import classes from './ProductCarusel.module.css'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);



function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth]);
        };
        window.addEventListener("resize", handleResize);
    }, []);
    if (window.innerWidth > 1700) { return 7 }
    if (window.innerWidth < 1700 && window.innerWidth > 1500) { return 6 }
    if (window.innerWidth < 1500 && window.innerWidth > 1300) { return 5 }
    if (window.innerWidth < 1300 && window.innerWidth > 1000) { return 4 }
    if (window.innerWidth < 1000 && window.innerWidth > 850) { return 3 }
    if (window.innerWidth < 850 ) { return 2 }
    // if (window.innerWidth < 850 && window.innerWidth > 700) { return 2 }
    // if (window.innerWidth < 700) { return 2 }
    // return size;
}



const ProductCarusel = ({products,description}) => {
    
    console.log('carusel product', products )

    let ProductsArr = [];

    
    products.map((p, index) => {
        
            ProductsArr.push(
                <SwiperSlide key={`${p._id}`}>
                    <ProductCard product={p} />
                </SwiperSlide>
            );
        
    })


    return (
        <div className={classes.swiper_container}>
            <div className={classes.swiper_container_description}>
                <span>{description}</span>
               
            </div>
            <Swiper
                spaceBetween={0}
                slidesPerView={useWindowSize()}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                className={classes.swiper_container_products}
            >
                {ProductsArr}
                
            </Swiper>
            
        </div>
    )

}
export default ProductCarusel;