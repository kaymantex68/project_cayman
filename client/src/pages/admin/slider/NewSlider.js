import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import slugify from 'react-slugify'
import { Input, Checkbox, Avatar, Badge } from 'antd';
import { uploadSliderImage, getSlide } from '../../../functions/slider.js'

const NewSlider = () => {
    const [name, setName] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))



    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadFiles(backgroundImage, "backgroundImage")
        await uploadFiles(mainImage, "mainImage")
        toast.success(`Слайд "${name}" создан`)
    }

    const uploadFiles = async (images, typeImage) => {
        let message=''
        if (typeImage==="backgroundImage") message="Фоновое изображение"
        if (typeImage==="mainImage") message="Основное изображение" 
        const files = images
        if (files) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                let formData = new FormData()
                formData.append('image', files[i])
                // formData.append('name', 'file')
                formData.append('name', name)
                formData.append('typeimage', typeImage)
                console.log(formData)
                await uploadSliderImage(formData, user.token)
                    .then(res => {
                        toast.success(`${message} загружено`)
                        console.log('complete upload', res.data)
                        setLoading(false)
                        // loadImage()
                    })
                    .catch(err => console.log(err))
            }
        }

    }

    const UploadImage = (image,type) => {

        return (
            <>
                {/* <div className="row">
                    {image
                        ?
                        <Badge
                            key={image.public_id}
                            count="X"
                            onClick={() => { }}
                            style={{ cursor: "pointer" }}
                            className="m-3"
                        >
                            <img
                                alt={image}
                                style={{ height: "100px" }}
                                key={image}
                                src={`${process.env.REACT_APP_IMAGES_SLIDER}/${image}`}
                                className="m-3"
                            />
                        </Badge>

                        : <h7 className="m-3 text-danger">нет изображений</h7>
                    }
                </div> */}
                <br/>
                <label className="btn btn-primary p-0" disabled={!name || loading}>
                    {`Загрузить изображение `}
                <input
                        type="file"
                        // hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => type==="backgrondImage"?  setBackgroundImage(e.target.files): setMainImage(e.target.files) }
                        disabled={!name || loading}
                    />
                </label>
            </>
        )
    }

    const ReturnNewSliderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Название нового слайда</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название слайда"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <br />
                    <label style={{ fontWeight: 'bold' }}>Фоновое изображение</label>
                    {UploadImage(backgroundImage,"backgrondImage")}
                </div>
                <div className="form-group">
                    <br />
                    <label style={{ fontWeight: 'bold' }}>Основное изображение</label>
                    {UploadImage(mainImage, "mainImage")}
                </div>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm p-3 "
                    disabled={!name || loading || !backgroundImage || !mainImage}
                    onClick={handleSubmit}
                >
                    Сохранить
                    </button>
            </form>
        )
    }
    return (
        <AdminNavigation name={'Новый слайд'} children={ReturnNewSliderForm()} />


    )
}

export default NewSlider