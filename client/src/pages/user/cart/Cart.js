import React, { useEffect, useState, useMemo } from "react";
import UserNavigation from "../../../components/nav/UserNavigation";
import { readCart } from "../../../functions/cart";
import { getWorks, addToWork, readWorks } from '../../../functions/work'
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/form/LoadingIcon";
import { addToCart } from "../../../functions/cart";
import { removeSlide } from "../../../functions/slider";
import { CloseCircleOutlined, SubnodeOutlined  } from "@ant-design/icons";
import { toast } from 'react-toastify'
import classes from './Cart.module.css'
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
  const [sumWork, setSumWork] = useState(0)
  const [coast, setCoast]=useState(0)
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const resetSum = () => {
    console.log('reset sum')
    setSum(cart.reduce((a, p) => a + p.count * p.coast, 0));
    setSumWork(Object.keys(workTable).reduce((a, key) => a + (workTable[key].coast * workTable[key].count), 0));
  };

  useMemo(()=>{
    setCoast(sum+sumWork)
  },[sum, sumWork])
  // console.log('work', sumWork)
  useState(() => {
    setLoading(true);
    readCart(user.token).then((res) => {
      setCart(res.data.cart);
      setSum(res.data.cart.reduce((a, p) => a + p.count * p.coast, 0));
      getWorks().then(res => {
        setWorks(res.data)
        readWorks(user.token).then(res => {
          setWorkTable(res.data.work)
          setSumWork(Object.keys(res.data.work).reduce((a, key) =>  a + (res.data.work[key].coast * res.data.work[key].count), 0));
        })
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

  // console.log(workTable)
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
    dispatch({
      type: "ADD_TO_WORK",
      payload: { ...workTable, [key]: temp },
    });
    let newWork={...workTable,[key]: temp}
    setSumWork(Object.keys(newWork).reduce((a, key) => a + (newWork[key].coast * newWork[key].count), 0));
    setWorkTable({ ...workTable, [key]: temp })
    addToWork({ ...workTable, [key]: temp }, user.token).then(res => {
      console.log(res.data)
    })
    
  }
  // add count
  const handleChangeCountWork = (e, key) => {
    let count = e.target.value
    if (count < 1) count = 1
    workTable[key].count = count
    dispatch({
      type: "ADD_TO_WORK",
      payload: { ...workTable },
    });
    setWorkTable({ ...workTable })
    addToWork({ ...workTable }, user.token).then(res => {
      console.log(res.data)
    })
    setSumWork(Object.keys(workTable).reduce((a, key) => a + (workTable[key].coast * workTable[key].count), 0));
  }
  // console.log(works)

  

  
  const handleDeleteWork = (e, key) => {
    console.log(key)
    let change = { ...workTable }
    delete change[key];
    setWorkTable(change)
    addToWork(change, user.token).then(res => {
      console.log(res.data)
    })
    setSumWork(Object.keys(change).reduce((a, key) => a + (change[key].coast * change[key].count), 0));
  }

  const handleClearWork = async () => {
    setLoading(true);
    await addToWork({}, user.token).then((res) => {
      dispatch({
        type: "ADD_TO_WORK",
        payload: {},
      });
      setWorkTable({});
    });
    setSumWork(0);
    setLoading(false);
  };


  const inputWork = (key, name) => {
    return (
      <div  >
        <select style={{ fontSize: "0.9rem" }} name="category" className="form-control" onChange={(e) => handleAddWork(e, key)}>
          <option key="1" value="all">Выберите вид работ</option>
          {works.length > 0 && works.map(w => {
            return <option key={w._id} selected={w.name === name} value={w._id}>{w.name}</option>
          })}
        </select>
      </div>
    )
  }

  const ReturnCart = () => {
    return (
      <>
      <div className="float-right    btn text-primary">{`Итого: ${coast} руб.`}</div>
      <br/>
        <div className="mt-2 container">
          
          
          
        </div>
        
        <hr />
        <div className="container">
        
        <div onClick={handleClear} className="btn btn-outline-danger float-left">
            очистить корзину
          </div>
        <div className="float-right btn text-primary">{`Итого (материалы): ${sum} руб.`}</div>
          <table className="table table-bordered table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>№</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Изображение</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Наименование</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Бренд</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Описание</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Кол-во</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Цена</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Сумма</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Удалить</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.map((p, index) => {
                let pathImage;
                if (p.images.length > 0)
                  pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${p.images[0]}`;
                else pathImage = "/images/product/default.png";
                return (
                  <tr key={p._id} >
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{index + 1}</td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
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
                    <th align="center" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                      <div>{p.name}</div>
                    </th>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.brand}</td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                      <div>
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
                      </div>
                    </td>
                    <td className="text-center" style={{ fontSize: "0.9rem", verticalAlign: "middle", maxWidth:"80px" }}>
                      <input
                        type="number"
                        className="form-control text-center"
                        style={{ fontSize:"0.9rem" }}
                        onChange={(e) => handleChangeCount(e, p)}
                        value={p.count}
                      />
                    </td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.coast} p.</td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{p.coast * p.count} р.</td>
                    <td style={{ verticalAlign: "middle" }}>
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
        {/* <hr /> */}
              <br/>
        {/* table work */}

        <div className="container">
        <div onClick={handleClearWork} className="btn btn-outline-danger float-left">
            очистить работы
          </div>
        <div className="float-right btn text-primary">{`Итого (работы): ${sumWork} руб.`}</div>
          <table className="table table-bordered table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>№</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Вид работ</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Кол-во</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Цена</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Сумма</th>
                <th scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>Удалить</th>
              </tr>
            </thead>
            <tbody className=" text-center">
              {Object.keys(workTable).map((key, index) => {
                return (
                  <tr style={{ fontSize: "0.9rem" }} >
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{index + 1}</td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{inputWork(key, workTable[key].name)}</td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle", maxWidth: "80px" }}>
                      
                      <input
                        type="number"
                        className="form-control text-center"

                        size="sm"
                        style={{ fontSize: "0.9rem"  }}
                        onChange={(e) => handleChangeCountWork(e, key)}
                        value={workTable[key].count}
                      />
                      
                    </td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }} >
                      {workTable[key].coast ? `${workTable[key].coast} р.` : null}
                    </td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                      {(workTable[key].coast && workTable[key].count) ? `${workTable[key].coast * workTable[key].count} p.` : null}
                    </td>
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                      <CloseCircleOutlined
                        className="text-danger"
                        onClick={(e) => handleDeleteWork(e, key)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* <hr /> */}
          <div className={classes.btnAdd} style={{display:"flex", alignItems:"center"}} onClick={handleAddWorkRow}><span>+ добавить работу</span></div>
          <br/>
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
