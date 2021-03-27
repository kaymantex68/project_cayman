import axios from 'axios'

export const getProducts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/catalog`)
}

export const getProductsFromCategory = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API}/catalog/${_id}`)
}

export const getProductsCategorySub = async (categoryId, subId) => {
    return await axios.post(`${process.env.REACT_APP_API}/productsCategorySub`,
    {
        categoryId,
        subId
    })
}



export const getProductsFilter = async (categoryId, subId, brandSlug, typeSwiper, filterBrand) => {
    return await axios.post(`${process.env.REACT_APP_API}/productsFilter`,
    {
        categoryId,
        subId,
        brandSlug,
        typeSwiper,
        filterBrand
    })
}


