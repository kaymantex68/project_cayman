import React, { useState, useEffect } from 'react'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import { readContacts, createContacts } from '../../../functions/contacts'
import { Input } from 'antd';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loadint from '../../../components/form/LoadingIcon'
import Loading from '../../../components/form/LoadingIcon';
const { TextArea } = Input;


const ContactsCreate = () => {
    const [contacts, setContacts] = useState({})
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        setLoading(true)
        readContacts().then(res => {
            setContacts(res.data)
            setLoading(false)
        })
    }, [])

    console.log('contacts', contacts)

    const handleChange = (e) => {
        setContacts({ ...contacts, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createContacts(contacts, user.token).then(res => {
            toast.success('Контакты изменены')
            setLoading(false)

        }).catch(err => {
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        })
    }

    const ReturnContacts = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group container">
                <h4>Адрес:</h4>
                <TextArea
                    rows={4}
                    placeholder="адрес"
                    allowClear
                    name="adress"
                    value={contacts.adress ? contacts.adress : ''}
                    onChange={handleChange}
                />
                <br />
                <br />
                <h4>Контакты:</h4>
                <TextArea
                    rows={4}
                    placeholder="контакты"
                    allowClear
                    name="contacts"
                    value={contacts.contacts ? contacts.contacts : ''}
                    onChange={handleChange}
                />
                <br />
                <br />
                <h4>Информация:</h4>
                <TextArea
                    rows={4}
                    placeholder="информация"
                    allowClear
                    name="info"
                    value={contacts.info ? contacts.info : ''}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button
                    className="btn btn-outline-primary"
                    disabled={loading}
                >
                    Добавить
                    </button>
            </div>
        </form>
    )

    return (
        <AdminNavigation name="Контакты" children={loading?  <Loading/>: ReturnContacts()} />
    );
};



export default ContactsCreate;