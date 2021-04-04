
import axios from 'axios'

export const createGroupDiscount = async (groupDiscount, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/groupDiscount`,
        { ...groupDiscount },
        {
            headers: {
                authtoken,
            }
        })
}

export const getGroupDiscounts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/groupDiscounts`)
}

export const getGroupDiscount = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/groupDiscount/${slug}`)
}

export const updateGroupDiscount = async (slug, groupDiscount, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/groupDiscount/${slug}`,
        { ...groupDiscount },
        {
            headers: {
                authtoken,
            }
        })
}

export const removeGroupDiscount = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/groupDiscount/${slug}`,
        {
            headers: {
                authtoken,
            }
        })
}