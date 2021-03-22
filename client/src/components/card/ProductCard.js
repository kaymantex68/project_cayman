import React from "react";
import classes from "./ProductCard.module.css";

const StyleInStock = {
  fontSize: "0.8rem",
  margin: "0px",
  padding: "3px 5px 5px 5px",
  color: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 7px rgba(0,0,0,0.3)",
};

const ProductCard = ({ product }) => {
  let pathImage = "";
  if (product.images.length > 0)
    pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${product.images[0]}`;
  else pathImage = "/images/product/default.png";
  return (
    <div
      style={{
        width: "220px",
        height: "380px",
        margin: "5px",
        border: "1px solid #e3e3e383",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 7px rgba(0,0,0,0.1)",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            width: "190px",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* picture */}
          <img
            style={{
              maxWidth: "180px",
              maxHeight: "150px",
            }}
            alt="example"
            src={pathImage}
          />
          {/* brand */}
          <img
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              maxWidth: "100px",
              maxHeight: "30px",
              padding: "7px 7px 7px 7px",
              borderRadius: "5px",
            //   backgroundColor: "rgba(177, 177, 177, 0.199)",
              boxShadow: "0 2px 7px rgba(0,0,0,0.2)",
              margin: "0px 0px 5px 5px"
            }}
            alt="example"
            src={`${process.env.REACT_APP_IMAGES_BRAND}/${product.brandSlug}.png`}
          />
        </div>
        <hr/>
        {/* product name */}
        <div style={{ margin: "0 5px 0 0", padding: "0" }}>
          <span
            style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#3C475B" }}
          >
            {product.name}
          </span>
        </div>
        {/* type */}
        <div style={{ margin: "0 5px 0 0", padding: "0" }}>
          <span
            style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#3C475B" }}
          >
            {product.type && product.type}
          </span>
        </div>
        {/* description */}
        <div style={{ margin: "0 5px 0 0", padding: "0" }}>
          <span
            style={{
              fontSize: "0.7rem",
              margin: "0px",
              padding: "0px",
              color: "#3C475B",
            }}
          >
            {product.params[1]
              ? `${product.params[1][0]} ${product.params[1][1]}`
              : "empty"}
          </span>
          <br />
          <span
            style={{
              fontSize: "0.7rem",
              margin: "0px",
              padding: "0px",
              color: "#3C475B",
            }}
          >
            {product.params[2]
              ? `${product.params[2][0]} ${product.params[2][1]}`
              : "empty"}
          </span>
        </div>
        {/* inStock */}
        <div style={{ margin: "5px 0px 5px 0px" }}>
          {product.inStock === 0 && (
            <span
              style={{
                ...StyleInStock,
                backgroundColor: "#d3a44c",
              }}
            >
              под заказ
            </span>
          )}
          {product.inStock === 1 && (
            <span
              style={{
                ...StyleInStock,
                backgroundColor: "#78C47A",
              }}
            >
              в наличии
            </span>
          )}
          {product.inStock === 2 && (
            <span
              style={{
                ...StyleInStock,
                backgroundColor: "rgba(255, 68, 0, 0.705)",
              }}
            >
              ожидается поступление
            </span>
          )}
        </div>
        {/* coast */}
        <div style={{ margin: "0 5px 0 0" }}>
          <span
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#3C475B" }}
          >
            {product.coast && `${product.coast} руб.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
