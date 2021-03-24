import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import slugify from 'react-slugify'
import { Input, Checkbox, Avatar, Badge } from 'antd';
import { uploadSliderImage, getSlides, getSlide } from '../../../functions/slider.js'
import Loading from '../../../components/form/LoadingIcon'
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";

const UpdateSlide = ({match, history}) => {
    const [name, setName] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [slide, setSlide] = useState(null)
    const [filter, setFilter] = useState('')
    const { user } = useSelector(state => ({ ...state }))

    const {slug}= match.params

    console.log('slide', slide)

    const loadSlide = () => {
        getSlide(slug).then((res) =>{ 
            setSlide(res.data)
            setName(res.data.name)
            // setBackgroundImage(res.data.backgroundImage)
            // setMainImage(res.data.mainImage)
        });
    };

    useState(() => {
        loadSlide();
    }, []);

    


    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadFiles(backgroundImage, "backgroundImage")
        await uploadFiles(mainImage, "mainImage")
        toast.success(`Слайд "${name}" создан`)
        history.push('/admin/slider')
        // loadSlide()
        // setBackgroundImage('')
        // setMainImage('')
        // setName('')
    }

    const uploadFiles = async (images, typeImage) => {
        let message = ''
        if (typeImage === "backgroundImage") message = "Фоновое изображение"
        if (typeImage === "mainImage") message = "Основное изображение"
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

    const UploadImage = (image, type) => {

        return (
            <>
                <br />
                <label className="btn btn-primary p-0" disabled={!name || loading}>
                    {`Загрузить изображение `}
                    <input
                        type="file"
                        // hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => type === "backgrondImage" ? setBackgroundImage(e.target.files) : setMainImage(e.target.files)}
                        disabled={!name || loading}
                    />
                </label>
            </>
        )
    }

    const CreateSliderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Новое название слайда</label>
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
                    {UploadImage(backgroundImage, "backgrondImage")}
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

    const searched = (filter) => (c) => c.name.toLowerCase().includes(filter);

    const ReturnSlide = () => (
        <div className="col md-5" style={{ backgroundColor: "white" }}>
            {/* {loading ? (
                <h6>
                    <LoadingOutlined />
                </h6>
            ) : (
                <h6>Управление "Категориями"</h6>
            )} */}
            <br />
            {CreateSliderForm()}
            
        </div>
    )


    return (
        <AdminNavigation name={'Слайды'} children={loading ? <Loading /> : ReturnSlide()} />


    )
}

export default UpdateSlide