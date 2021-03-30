import React, { useEffect, useState } from "react";
import UserNavigation from "../../../components/nav/UserNavigation";
import { readCart } from "../../../functions/cart";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/form/LoadingIcon";
import { addToCart } from "../../../functions/cart";
import { removeSlide } from "../../../functions/slider";
import { CloseCircleOutlined } from "@ant-design/icons";
import {toast} from 'react-toastify' 
// import './Cart.css'
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const resetSum = () => {
    console.log('reset sum')
    setSum(cart.reduce((a, p) => a + p.count * p.coast, 0));
  };

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
    setSum(0);
    setLoading(false);
  };

  const handleChangeCount = async (e, product) => {
    // setLoading(true)
    // console.log(e.target.value)
    let count = e.target.value;
    if (count < 1) {
      count = 1;
    }
    let change = cart.map((p) => {
      if (p.name === product.name) {
        p.count = count;
      }
      return p;
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: [...change],
    });
    setCart([...change]);
    await addToCart([...change], user.token).then((res) => {
      // console.log(res.data);
    });
    resetSum();
    //  console.log('change', change)
  };

  const handleDelete = async (e, product) => {
    // setLoading(true)
    let change = cart.filter((p) => {
      if (p !== product) {
        return p;
      }
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: [...change],
    });
    setCart([...change]);
    await addToCart([...change], user.token).then((res) => {
      // console.log(res.data);
    })
    .catch(err=>{
      console.log('err in cart:', err)
      if (err.response.status === 400) toast.error(err.response.data);
    });
    setSum(change.reduce((a, p) => a + p.count * p.coast, 0));
    // setLoading(false);
  };

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
                <th scope="col">Удалить</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.map((p, index) => {
                let pathImage;
                if (p.images.length > 0)
                  pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`;
                else pathImage = "/images/product/default.png";
                return (
                  <tr key={p._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{
                          maxWidth: "90px",
                          maxHeight: "70px",
                          // border: "1px solid black",
                        }}
                        alt="picture"
                        src={pathImage}
                      />
                    </td>
                    <th>
                      <div>{p.name}</div>
                    </th>
                    <td>{p.brand}</td>
                    <td>
                      <p
                        style={{
                          margin: "0px",
                          padding: "0px",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                        }}
                      >{`${p.type}`}</p>
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
                        className="form-control"
                        style={{ maxWidth: "100px" }}
                        onChange={(e) => handleChangeCount(e, p)}
                        value={p.count}
                      />
                    </td>
                    <td>{p.coast} p.</td>
                    <td>{p.coast * p.count} р.</td>
                    <td>
                      <CloseCircleOutlined
                        className="text-danger"
                        onClick={(e) => handleDelete(e, p)}
                      />
                    </td>
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
