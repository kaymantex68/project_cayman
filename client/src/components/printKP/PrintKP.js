import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import classes from './PrintKP.module.css'
import { readCart } from '../../functions/cart'
import { readWorks } from '../../functions/work'
import { useSelector } from 'react-redux'

// Create Document Component
const PrintKP = () => {
  const [cart, setCart] = useState([])
  const [works, setWorks] = useState({})

  const { user } = useSelector(state => ({ ...state }))

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "padding-top: 200px, width:  200px"
  });

  console.log('cart', cart)
  console.log('work', works)

  useEffect(() => {
    readCart(user.token).then(res => {
      setCart(res.data.cart)
      readWorks(user.token).then(res => {
        setWorks(res.data.work)
      })
    })
  }, [])

  return (
    <div сlassName="container" >
      <div className="container pt-2">
      <div className="btn btn-danger pt-2" onClick={handlePrint}>Распечатать</div>
      </div>
      <div className="container" pageStyle={{padding:"30px"}} ref={componentRef}>
        <div className="p-3">
          <div className="btn btn-success float-right">стоимость оборудования: {cart.reduce((a, b) => (a + b.coast * +b.count), 0)} руб.</div>
          <table className="table table-bordered table-sm pt-3">
            <thead >
              <tr className="text-center">
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>№</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Изображение</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Наименование</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Бренд</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Описание</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Кол-во</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Цена</td>
                <td scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Сумма</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.map((product, index) => {
                let pathImage;
                if (product.images.length > 0)
                  pathImage = `${process.env.REACT_APP_IMAGES_PRODUCTS}/${product.images[0]}`;
                else pathImage = "/images/product/default.png";
                return (
                  <tr>
                    {/* index */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{index + 1}</td>
                    {/* image */}
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
                    {/* name */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{product.name}</td>
                    {/* brand */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{product.brand}</td>
                    {/* description */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>
                      <div>
                        <p
                          style={{
                            margin: "0px",
                            padding: "0px",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                          }}
                        >{`${product.type}`}</p>
                        <p
                          style={{
                            margin: "0px",
                            padding: "0px",
                            fontSize: "0.7rem",
                          }}
                        >{`${product.params[1][0]} ${product.params[1][1]}`}</p>
                        <p
                          style={{
                            margin: "0px",
                            padding: "0px",
                            fontSize: "0.7rem",
                          }}
                        >{`${product.params[2][0]} ${product.params[2][1]}`}</p>
                      </div>
                    </td>
                    {/* count */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{product.count}</td>
                    {/* coast */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{product.coast}</td>
                    {/* summ */}
                    <td style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{+product.count * +product.coast}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* work */}
          <div className="btn btn-success float-right">стоимость работ: {Object.keys(works).reduce((a,key)=>(a+works[key].coast*+works[key].count),0)} руб.</div>
          <table className="table table-bordered table-sm">
            <thead >
              <tr className="text-center">
                <th scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>№</th>
                <th scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Вид работ</th>
                <th scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Кол-во</th>
                <th scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Цена</th>
                <th scope="col" style={{ fontWeight: "bold", fontSize: "0.9rem", verticalAlign: "middle" }}>Сумма</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                Object.keys(works).map((key, index) => {
                  return (
                    <tr>
                      {/* number */}
                      <td scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{index + 1}</td>
                      {/* work */}
                      <td scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{works[key].name}</td>
                      {/* count */}
                      <td scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{works[key].count}</td>
                      {/* coast */}
                      <td scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{works[key].coast}</td>
                      {/* sum */}
                      <td scope="col" style={{ fontSize: "0.9rem", verticalAlign: "middle" }}>{+works[key].count * +works[key].coast}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default PrintKP