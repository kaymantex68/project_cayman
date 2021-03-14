
import axios from 'axios'

export const createBrand = async (brand, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/brand`,
        { ...brand },
        {
            headers: {
                authtoken,
            }
        })
}

export const getBrands = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/brands`)
}

export const getBrand = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API}/brand/${_id}`)
}

export const updateBrand = async (_id, brand, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/brand/${_id}`,
        { ...brand },
        {
            headers: {
                authtoken,
            }
        })
}

export const removeBrand = async (_id, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/brand/${_id}`,
        {
            headers: {
                authtoken,
            }
        })
}
