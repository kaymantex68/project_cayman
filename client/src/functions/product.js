import axios from 'axios'


export const createProduct = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`,
        { ...product },
        {
            headers: {
                authtoken,
            }
        })
}

export const getProducts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/products`)
}

export const getProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
}

export const updateProduct = async (_id, product, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${_id}`,
        { ...product },
        {
            headers: {
                authtoken,
            }
        })
}

export const removeProduct = async (_id, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${_id}`,
        {
            headers: {
                authtoken
            }
        })
}

export const removeFile = async(slug, fileName, authtoken)=>{
    return await axios.put(`${process.env.REACT_APP_API}/productImage`,
    {slug, fileName},
    {
        headers: {
            authtoken
        }
    })}

    export const uploadImage = async (data, slug, slugBrand, authtoken) => {
        return await axios.post(`${process.env.REACT_APP_API}/productImage`,
            data,
            {
                headers: {
                    authtoken,
                    type: "formData",
                    slug,
                    slugBrand,
                }
            })
    }

    

    export const removeUnusedFile = async(fileName, authtoken)=>{
        return await axios.delete(`${process.env.REACT_APP_API}/unusedImages/${fileName}`,
        {
            headers: {
                authtoken
            }
        })}