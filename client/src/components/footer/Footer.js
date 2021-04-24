import React from 'react'
import classes from './Footer.module.css'
import visa from '../../../src/pictures/visa.svg'
import masterCard from '../../../src/pictures/mastercard.svg'
import {
    YoutubeOutlined,
    InstagramOutlined,
    CreditCardOutlined,
} from '@ant-design/icons'

const Footer = () => {
    return (
        <div className={classes.footerContainer}>
            <div className={classes.containerCenter}>
                <div className={classes.containerCenterTop}>
                    <div className={classes.containerLogo}>
                        <div>
                            <img className={classes.logo} style={{ marginBottom: "10px" }} src={`${process.env.REACT_APP_IMAGES_LOGO}/logo.png`} />
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>+7 (920) 489-74-37</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>8 (4752) 25-35-65</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>mail@kyamantex.ru</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>kaymantex68@yandex.ru</div>
                        </div>
                    </div>
                    <div className={classes.containerContacs}>
                        <div>
                            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Компания</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Партнерские сертификаты</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Вакансии</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Адрес офиса</div>
                        </div>
                    </div>
                    <div className={classes.containerInfo}>
                        <div>
                            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Наши предложения</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Брэнды</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Функциональные группы</div>
                        </div>
                    </div>
                    <div className={classes.containerService}>
                        <div>
                            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Сервис</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Гарантийный ремонт</div>
                            <div style={{ fontSize: "0.8rem", color: "white", marginBottom: "10px" }}>Помощь по сайту</div>
                        </div>
                    </div>
                </div>
                <div className={classes.containerCenterBottom}>
                    <div className={classes.copyright} style={{ marginRight: "20px" }}>2013-2021 торговый дом Кайман</div>
                    <div className={classes.social} style={{ marginRight: "20px" }}>
                        <YoutubeOutlined style={{ color: "white", fontSize: "2rem", marginRight: "10px" }} />
                        <InstagramOutlined style={{ color: "white", fontSize: "2rem" }} />
                    </div>
                    <div className={classes.creditCard} style={{ marginRight: "20px" }}>
                        <div>Принимаем к оплате: </div>
                        {/* <CreditCardOutlined style={{ color: "white", fontSize: "2rem", marginLeft: "10px" }} /> */}
                         <img src={visa} style={{maxHeight:"80px", width:"80px", marginLeft:"10px"}}/>
                         <img src={masterCard} style={{maxHeight:"80px", width:"80px", marginLeft:"10px"}}/>
                    </div>
                  
                        <div className={classes.any} style={{ color: "white", marginRight: "20px" }} >Правовая информация</div>
                        <div className={classes.any} style={{ color: "white", marginRight: "20px" }}>Контакты</div>
                        <div className={classes.any} style={{ color: "white", marginRight: "20px" }}>Карта сайта</div>
                    
                </div>
            </div>
        </div>
    )
}

export default Footer