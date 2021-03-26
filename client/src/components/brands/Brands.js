import React, { useState, useEffect } from "react";
import { getBrandPictures } from "../../functions/uploadImages";
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
      {brands.map((l) => {
        return (
          <img
            key={l._id}
            alt="logo"
            src={`${process.env.REACT_APP_IMAGES_BRAND}/${l.fileName}`}
            style={{ maxWidth: "100px", margin: "10px", cursor:"pointer" }}
          />
        );
      })}
    </div>
  );
};

export default BrandsPictures;
