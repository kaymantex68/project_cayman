import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    maxWidth: "100px",
    maxHeight: "80px",
  };

  return (
    <Drawer
      title={`Корзина/ ${cart.length} товаров`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
      width="300"
      
    >
        <div style={{overflow: "auto"}}>
      {cart.map((p) => {
        let pathImage = "";
        if (p.images.length > 0) pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`;
        else pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/default.png`;
        return (
          <div key={p._id} className="m-0 p-0" >
            {p.images && (
              <div>
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img alt="picture" src={pathImage} style={imageStyle} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "center", fontSize:"0.8rem" }}>
                      <div>
                      {p.name}  <span className="text-danger ml-1">x {p.count}</span>
                      </div>
                    
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <hr/>
      <Link to="/user/cart">
        <button
          className="text-center btn btn-primary btn-raised btn-block"
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
        >
          Перейти в корзину
        </button>
      </Link>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
