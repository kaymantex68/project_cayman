import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const ModalOrder = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({ ...state }))
    const { modal } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState('')


    useEffect(()=>{
        if (user && user.name) setName(user.name)
        if (user && user.email ) setEmail(user.email)
    },[user])

    const handleOk = () => {
        if (name !== '' && phone !== '' && email !== '') {
            dispatch({
                type: "SET_INFO_ORDER",
                payload: {
                    name: name,
                    phone: phone,
                    email: email,
                    info: info,
                },
            })
            dispatch({
                type: "SET_VISIBLE_MODAL",
                payload: false,
            })
        }
    }

    const handleCancel = () => {
        dispatch({
            type: "SET_INFO_ORDER",
            payload: null,
        })
        dispatch({
            type: "SET_VISIBLE_MODAL",
            payload: false,
        })
    }

    return (
        <Modal
            title="Оформить заказ"
            style={{ width: "450px", height: "300px" }}
            visible={modal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div style={{ overflow: "auto" }}>
                <span>ФИО:</span>
                <TextArea rows={2} placeholder="фио (обязательное поле)" style={{ marginBottom: "10px" }} value={name} onChange={(e) => setName(e.target.value)} />
                <span>Телефон:</span>
                <TextArea rows={2} placeholder="телефон (обязательное поле)" style={{ marginBottom: "10px" }} value={phone} onChange={(e) => setPhone(e.target.value)} />
                <span>Email:</span>
                <TextArea rows={2} placeholder="email (обязательное поле)" style={{ marginBottom: "10px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Доставка и прочие пожелания:</span>
                <TextArea rows={4} style={{ marginBottom: "10px" }} value={info} onChange={(e) => setInfo(e.target.value)} />
            </div>
        </Modal>
    );
};

export default ModalOrder;
