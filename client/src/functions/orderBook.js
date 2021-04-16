import axios from 'axios'


export const createOrder = async (order, user) => {
    return await axios.post(`${process.env.REACT_APP_API}/orderBook`,
        {order},
        {
            headers: {
                user,
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