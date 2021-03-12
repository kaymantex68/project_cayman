import axios from 'axios'

export const uploadImage = async (data, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/brandImage`,
        data ,
        {
            headers: {
                authtoken,
                type:"formData"
            }
        })
}