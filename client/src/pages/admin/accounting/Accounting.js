import React, { useState, useEffect } from 'react'
import { getProducts } from '../../../functions/product'
import classes from './Accounting.module.css'
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

const Accounting = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data)
        }).catch(err => console.log('error loading products ->', err))
    }, [])

    console.log('products', products)


    const returnIncomingProducts=()=>{
        return(
            <div className={`${classes.tableContainer} container`}>
                <table className="table table-bordered table-sm">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col" >№</th>
                            <th scope="col" >Изображение</th>
                            <th scope="col" >Наименование</th>
                            <th scope="col" >Brand</th>
                            <th scope="col" >Кол-во</th>
                            <th scope="col" >Закупочная цена</th>
                            <th scope="col" >Средняя цена</th>
                            <th scope="col" >Отгрузка со склада (средняя цена * 1.2)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, index) => {
                                return (
                                    <tr key={p._id} >
                                        <td>{index + 1}</td>
                                        <td></td>
                                        <td>{p.name}</td>
                                        <td>{p.brand}</td>
                                        <td>{p.count}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }



    return (
        <>
            <Tabs defaultActiveKey="1" type="card" >
                <TabPane tab="Приход товара" key="1">
                    {returnIncomingProducts()}
                </TabPane>
                <TabPane tab="Отгрузки" key="2">
                    Content of card tab 2
                </TabPane>
                <TabPane tab="Баланс" key="3">
                    Content of card tab 3
                </TabPane>
            </Tabs>
            
        </>

    )
}

export default Accounting