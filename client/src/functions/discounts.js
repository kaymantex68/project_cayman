import axios from 'axios'

export const addToDiscounts= async (_id,discount, authtoken)=>{
    // console.log('function cart', cart)
    return axios.post(`${process.env.REACT_APP_API}/addUserDiscount/${_id}`,
    {discount},
    {
        headers: {
            authtoken,
        }
    })
}

// export const getUserDiscounts= async (_id, authtoken)=>{
//     // console.log('function cart', cart)
//     return axios.post(`${process.env.REACT_APP_API}/discounts/${_id}`,
//     {},
//     {
//         headers: {
//             authtoken,
//         }
//     })
// }