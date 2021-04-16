import axios from 'axios'

// add picture to dataBase
export const createContacts = async (contacts, authtoken) => {
    console.log('we here', contacts)
    return await axios.post(`${process.env.REACT_APP_API}/contacts`,
        { contacts },
        {
            headers: {
                authtoken,
            }
        })
}

export const readContacts = async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/contacts`)
}