import axios from 'axios'

export const uploadImage = async (data, name, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/dilerImage`,
        data,
        {
            headers: {
                authtoken,
                type: "formData",
                name
            }
        })
}
// add picture to dataBase
export const create = async (name, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/dilerImage/data`,
        { name },
        {
            headers: {
                authtoken,
            }
        })
}
//get brand picture info
export const getDilerPictureInfo = async (name) => {
    return await axios.get(`${process.env.REACT_APP_API}/dilerImage/${name}`)
}

export const getDilers = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/dilers`)
}

// get all brand pictures
export const getDilerPictures= async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/dilerImages`)
}


export const removeDilerPicture= async(slug, authtoken)=>{
    console.log("------",slug)
    return await axios.delete(`${process.env.REACT_APP_API}/dilerImage/${slug}`,
    {
        headers:{
            authtoken
        }
    })
}


