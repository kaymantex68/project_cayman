import axios from 'axios'

export const addToCart = async (cart, authtoken) => {
    // console.log('function cart', cart)
    return axios.post(`${process.env.REACT_APP_API}/cart`,
        { cart },
        {
            headers: {
                authtoken,
            }
        })
}

export const readCart = async (authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/cartItems`,
        {},
        {
            headers: {
                authtoken,
            }
        })
}

export const readProducts = async (products, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/cartItemsMany`,
        { products },
        {
            headers: {
                authtoken,
            }
        }
    )
}



