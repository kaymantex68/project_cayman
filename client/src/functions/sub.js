
import axios from 'axios'

export const createSub = async (sub, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/sub`,
        { ...sub },
        {
            headers: {
                authtoken,
            }
        })
}

export const getSubs = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subs`)
}

export const getSub = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${_id}`)
}

export const updateSub = async (_id, sub, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/sub/${_id}`,
        { ...sub },
        {
            headers: {
                authtoken,
            }
        })
}

export const removeSub = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,
        {
            headers: {
                authtoken,
            }
        })
}