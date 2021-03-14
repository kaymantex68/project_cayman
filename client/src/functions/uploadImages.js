import axios from 'axios'

export const uploadImage = async (data,name, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/brandImage`,
        data ,
        {
            headers: {
                authtoken,
                type:"formData",
                name
            }
        })
}
// add picture to dataBase
export const create = async (name, authtoken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/brandImage/data`, 
    {name},
    {
        headers: {
            authtoken,
        }
    })
}