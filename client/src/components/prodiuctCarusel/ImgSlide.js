
import React from 'react';
import classes from './ImgSlide.module.css';



const  ImgSlide = ({s})=> {
    return (
        <div className={classes.SlidePicture}
            style={{
                backgroundImage:`url(${process.env.REACT_APP_IMAGES_SLIDER}/${s.backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <img
                alt={s.mainImage}
                // style={{ height: "100px" }}
                key={s.mainImage}
                src={`${process.env.REACT_APP_IMAGES_SLIDER}/${s.mainImage}`}
                className={classes.Picture}
            />
        </div>
    );

}
export default ImgSlide;