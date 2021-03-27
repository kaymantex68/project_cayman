import React, { useState, useEffect, lazy } from 'react'
import NavMenu from '../components/nav/NavMenu'
import Slider from '../components/slider/Slider'
import ProductCarusel from '../components/prodiuctCarusel/ProductCarusel'
import BrandsPictures from '../components/brands/Brands'
import { getProduct, getProducts } from '../functions/product'
import { getProductsFilter } from '../functions/catalog'
import OurParthners from '../components/ourPartners/OurParthners'
import Footer from '../components/footer/Footer'

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
        }).catch(err => console.log(err))
    }, [])

    // console.log('lider', liderArray)
    // console.log('sale', salesArray)

    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div>
                <Slider />
            </div>
            <div>
                <ProductCarusel products={liders} description='Лидеры продаж' />
            </div>
            <div>
               {sales.length>0 && <ProductCarusel products={sales} description='Распродажа' />}
            </div>
            <div>
                <BrandsPictures/>
            </div>
            <div>
                <OurParthners/>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}

export default Home