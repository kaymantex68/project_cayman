import axios from 'axios'


export const createOrder = async (order, user, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/orderBook`,
        {order},
        {
            headers: {
                user,
                authtoken
            }
        })
}

export const listOrders = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/orders`,
        {},
        {
            headers: {
                authtoken,
            }
        })
}


export const updateOrder = async (_id, order, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/order/${_id}`,
        {order},
        {
            headers: {
                authtoken,
            }
        })
}

export const removeOrder = async (_id, authtoken) =>{
    return await axios.delete(`${process.env.REACT_APP_API}/order/${_id}`,
    {
        headers: {
            authtoken,
        }
    })
}