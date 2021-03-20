import axios from 'axios'

export const getPictureFromFolder = async ()=>{
    return await axios.get(`${process.env.REACT_APP_API}/picture-product`)
}