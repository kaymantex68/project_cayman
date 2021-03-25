import React, { useState, useEffect, lazy } from 'react'
import NavMenu from '../components/nav/NavMenu'
import Slider from '../components/slider/slider'
import ProductCarusel from '../components/prodiuctCarusel/ProductCarusel'
import { getProduct, getProducts } from '../functions/product'
import { getProductsFilter } from '../functions/catalog'
import { ConsoleSqlOutlined } from '@ant-design/icons'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [liders, setLiders] = useState([])
    const [sales, setSales] = useState([])

    useEffect(() => {
        setLoading(true)
        getProductsFilter(null, null, null, 'lider').then(res => {
            setLiders(res.data)
            getProductsFilter(null, null, null, 'sale').then(res => {
                setSales(res.data)
                setLoading(false)
            })
        })
    },[])

    // console.log('lider', liderArray)
    // console.log('sale', salesArray)

    return (
        <>
            <div>
                <NavMenu />
            </div>
            {
                !loading && <div>
                    <div>
                        <Slider />
                    </div>
                    <div>
                        <ProductCarusel products={liders} description='Лидеры продаж' />
                    </div>
                    <div>
                        <ProductCarusel products={sales} description='Распродажа' />
                    </div>
                </div>
            }

        </>
    )
}

export default Home