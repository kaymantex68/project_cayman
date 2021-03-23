import axios from 'axios'

export const uploadSliderImage = async (data, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/slider`,
        data,
        {
            headers: {
                authtoken,   
            }
        })
}

export const getSlife = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/slide/${slug}`)
}