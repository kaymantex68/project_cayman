import axios from 'axios'

export const getUsers = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/users`,
    {},
    {
        headers:{
            authtoken
        }
    })
}


export const getUser = async (_id,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/${_id}`,
    {},
    {
        headers:{
            authtoken
        }
    })
}