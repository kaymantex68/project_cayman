import React, { useState, useEffect } from 'react'
import classes from './Contacts.module.css'
import NavMenu from '../../components/nav/NavMenu'
import Footer from '../../components/footer/Footer'
import { readContacts } from '../../functions/contacts'



const Contacts = () => {
    const [contacts, setContacts] = useState({})


    useEffect(() => {
        readContacts().then(res => {
            setContacts(res.data)
        })
    }, [])

    console.log('contacts', contacts)

    return (
        <>
            <div>
                <NavMenu />
            </div>
            <div className={classes.contactsContainer}>
                <div className={classes.infoContainer}>
                    <div className={classes.info}>
                        <h4>Как нас найти:</h4>
                        {contacts.adress && <div>{contacts.adress}</div>}
                        <h4>Контакты:</h4>
                        {contacts.contacts && <div>{contacts.contacts}</div>}
                        <hr />
                        {contacts.info && <div>{contacts.info}</div>}
                    </div>
                </div>
                <div className={classes.mapContainer}>
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa75e51849bb3f473dd8ffed77e5d846a1ff134970372d9a4b6941ba133dc2229&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Contacts