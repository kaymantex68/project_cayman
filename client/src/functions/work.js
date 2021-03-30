
import axios from 'axios'

export const createWork = async (work, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/work`,
        { ...work },
        {
            headers: {
                authtoken,
            }
        })
}

export const getWorks = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/works`)
}


export const getWork = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/work/${slug}`)
}

export const updateWork = async (_id, work, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/work/${_id}`,
        { ...work },
        {
            headers: {
                authtoken,
            }
        })
}

export const removeWork = async (_id, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/work/${_id}`,
        {
            headers: {
                authtoken,
            }
        })
}