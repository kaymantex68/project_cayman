import React, { useEffect, useState } from "react";
import UserNavigation from "../../../components/nav/UserNavigation";
import { readCart } from "../../../functions/cart";
import { getWorks } from '../../../functions/work'
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/form/LoadingIcon";
import { addToCart } from "../../../functions/cart";
import { removeSlide } from "../../../functions/slider";
import { CloseCircleOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify'
// import './Cart.css'
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [works, setWorks] = useState([])
  const [workTable, setWorkTable] = useState({})
  // const [singlWorkTable, setSingleWorkTable] = useState({
  //   name: null,
  //   coast: null,
  //   count: null,
  // })

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
      getWorks().then(res => {
        setWorks(res.data)
        setLoading(false);
      })
    }).catch(err => {
      setLoading(false);
      if (err.response.status === 401) toast.error(err.response.data);
      window.location.reload()
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
      .catch(err => {
        console.log('err in cart:', err)
        if (err.response.status === 400) toast.error(err.response.data);
      });
    setSum(change.reduce((a, p) => a + p.count * p.coast, 0));
    // setLoading(false);
  };

  console.log(workTable)
  const handleAddWorkRow = () => {
    workTable[Date.now()] = {}
    setWorkTable({ ...workTable })
  }

  // add work
  const handleAddWork = (e, key) => {

    // console.log('work', e.target.value)
    let result = works.find(w => {
      return e.target.value === w._id
    })

    const temp = {}
    temp.name = result.name
    temp.coast = result.coast
    temp.count = 1
    setWorkTable({ ...workTable, [key]: temp })
  }
  // add count
  const handleChangeCountWork = (e, key) => {
    let count = e.target.value
    if (count < 1) count = 1
    workTable[key].count = count


    setWorkTable({ ...workTable })
  }
  console.log(works)

  const inputWork = (key) => {
    return (
      <div className="form-group" >
        <select style={{fontSize:"0.9rem" }} name="category" className="form-control" onChange={(e) => handleAddWork(e, key)}>
          <option  key="1" value="all">Выберите вид работ</option>
          {works.length > 0 && works.map(w => {
            return <option key={w._id} value={w._id}>{w.name}</option>
          })}
        </select>
      </div>
    )
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
        <hr />
        <div className="container">
          <table className="table table-bordered table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">№</th>
                <th scope="col">Вид работ</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Цена</th>
                <th scope="col">Сумма</th>
                <th scope="col">Удалить</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Object.keys(workTable).map((key, index) => {
                return (
                  <tr style={{fontSize:"0.9rem"}}>
                    <td>{index + 1}</td>
                    <td >{inputWork(key)}</td>
                    <td> <input
                      type="number"
                      className="form-control"
                      style={{ maxWidth: "100px", fontSize:"0.9rem" }}
                      onChange={(e) => handleChangeCountWork(e, key)}
                      value={workTable[key].count}
                    /></td>
                    <td style={{fontSize:"0.9rem" }} >{workTable[key].coast}</td>
                    <td style={{fontSize:"0.9rem" }}>{(workTable[key].coast && workTable[key].count) && workTable[key].coast * workTable[key].count}</td>
                    <td> <CloseCircleOutlined
                      className="text-danger"
                    /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <hr />
          <div className="btn btn-primary" onClick={handleAddWorkRow}>Добавить</div>
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
