import React, {useState} from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Slider.module.css'
import ImgSlide from './ImgSlide'

import {getSlides} from '../../functions/slider'
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


const Slider =()=>{
    const [slides, setSlides]=useState([])

    useState(()=>{
        getSlides().then(res=>{
            setSlides(res.data)
        })
    },[])

    // const { Slides } = props;
    const slidesArr = [];
    /**
     * формируем массив слайдов, в массив добавлем компоненту ImgSlider 
     * которая отрисовывет нам один слайд
     */
    slides.map((slide, index) => {
        slidesArr.push(
            <SwiperSlide key={`slide-${index}`}>
                {slide &&
                    <a key={`link-nav-${index}`} href={""}>
                        <ImgSlide s={slide} />
                    </a>
                }
                {/* {item.link_b &&
                    <Link to={item.link_b}>
                        <ImgSlide key={index} obj={item} />
                    </Link>
                } */}
            </SwiperSlide>
        );
    })



    return(
        <div className={classes.slider_container}>
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={{ clickable: true }}
            pagination={{ clickable: false }}
            loop={true}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            className={classes.slider_container_pagination}
        >
            {slidesArr}
        </Swiper>
    </div> 
    )
}

export default Slider