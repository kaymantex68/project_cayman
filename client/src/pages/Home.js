import React, {useState, useEffect} from 'react'
import NavMenu from '../components/nav/NavMenu'
import Slider from '../components/slider/slider'
import ProductCarusel from '../components/prodiuctCarusel/ProductCarusel'
import {getProducts} from '../functions/product'

const Home = () => {
    const [products, setProducts]=useState([])
    
    useEffect(()=>{
        getProducts()
        .then(res=>{
            setProducts(res.data)
            console.log('products', products)
        })
    },[])

    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div>
                <Slider />
            </div>
            <div>
                <ProductCarusel products={products} description='Лидеры продаж'/>
            </div>
            <div>
                <ProductCarusel products={products} description='Распродажа'/>
            </div>
        </>
    )
}

export default Home