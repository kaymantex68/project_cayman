import React, { useState, useEffect } from "react";
import { getBrandPictures } from "../../functions/uploadImages";
import { Link } from 'react-router-dom'
import classes from './Brands.module.css'
const BrandsPictures = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBrandPictures().then((res) => {
      setBrands(res.data);
      setLoading(false);
    });
  }, []);

  console.log("brand pictures", brands);

  return (
    <div className="container-fluid" style={{ textAlign: "-webkit-center" }}>
      <div
        style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", color: "#3C475B", marginTop: "10px" }}
      >
        <span>Наши бренды</span>
      </div>
      {brands.map((l) => {
        return (
          <Link to={`/catalog/brand/${l.slug}`}>
            <img
              key={l._id}
              alt="logo"
              src={`${process.env.REACT_APP_IMAGES_BRAND}/${l.fileName}`}
              className={classes.brandImage}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default BrandsPictures;
