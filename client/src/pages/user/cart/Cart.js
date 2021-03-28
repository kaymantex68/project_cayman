import React, { useEffect, useState } from "react";
import UserNavigation from "../../../components/nav/UserNavigation";
import { readCart } from "../../../functions/cart";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/form/LoadingIcon";
import { addToCart } from "../../../functions/cart";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useState(() => {
    setLoading(true);
    readCart(user.token).then((res) => {
      setCart(res.data.cart);
      setSum(res.data.cart.reduce((a, p) => a + p.count * p.coast, 0));
      setLoading(false);
    });
  }, []);

  const handleClear = async () => {
    setLoading(true);
    await addToCart([], user.token).then((res) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      setCart([]);
    });
    setLoading(false);
  };

  const handleChangeCount=(e)=>{
    console.log(e.target.value)
   
  }

  const ReturnCart = () => {
    return (
      <>
        <div className="mt-2 container">
          <div onClick={handleClear} className="btn btn-outline-danger">
            очистить корзину
          </div>
          <div className="float-right btn text-primary">{`Итого: ${sum} руб.`}</div>
        </div>
        <hr />
        <div className="container">
          <table className="table table-bordered table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">№</th>
                <th scope="col">Изображение</th>
                <th scope="col">Наименование</th>
                <th scope="col">Бренд</th>
                <th scope="col">Описание</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Цена</th>
                <th scope="col">Сумма</th>
              </tr>
            </thead>
            <tbody >
              {cart.map((p, index) => {
                let pathImage;
                if (p.images.length > 0)
                  pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`;
                else pathImage = "/images/product/default.png";
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{
                          maxWidth: "70px",
                          maxHeight: "70px",
                        }}
                        alt="example"
                        src={pathImage}
                      />
                    </td>
                    <th style={{ maxWidth: "200px" }}>
                      <div>{p.name}</div>
                    </th>
                    <td>{p.brand}</td>
                    <td>
                      <p
                        style={{
                          margin: "0px",
                          padding: "0px",
                          fontSize: "0.7rem",
                        }}
                      >{`${p.params[1][0]} ${p.params[1][1]}`}</p>
                      <p
                        style={{
                          margin: "0px",
                          padding: "0px",
                          fontSize: "0.7rem",
                        }}
                      >{`${p.params[2][0]} ${p.params[2][1]}`}</p>
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        className='form-control'
                        style={{maxWidth:"80px"}}
                        onChange={handleChangeCount}
                        value={p.count}
                      />
                    </td>
                    <td>{p.coast} p.</td>
                    <td>{p.coast * p.count} р.</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <UserNavigation
      name="Корзина"
      children={loading ? <Loading /> : ReturnCart()}
    />
  );
};

export default Cart;
