import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import slugify from 'react-slugify'
import { Input, Checkbox, Avatar, Badge } from 'antd';
import { uploadSliderImage, getSlides, removeSlide } from '../../../functions/slider.js'
import Loading from '../../../components/form/LoadingIcon'
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";

const CreateSlide = () => {
    const [name, setName] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [slides, setSlides] = useState([])
    const [filter, setFilter] = useState('')
    const { user } = useSelector(state => ({ ...state }))

    console.log('slides', slides)

    const loadSlides = () => {
        getSlides().then((res) => setSlides(res.data));
    };

    useState(() => {
        loadSlides();
    }, []);

    const handleRemove = (slug, name, turn) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeSlide(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Слайд ${name} с номером  удалена!`);
                    loadSlides();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadFiles(backgroundImage, "backgroundImage")
        await uploadFiles(mainImage, "mainImage")
        toast.success(`Слайд "${name}" создан`)
        loadSlides()
        setBackgroundImage('')
        setMainImage('')
        setName('')
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
                <br />
                <label className="btn btn-primary p-0" disabled={!name || loading}>
                    {`Загрузить изображение    `}
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
            <hr />
            <LocalSearch filter={filter} setFilter={setFilter} />
            {slides.filter(searched(filter)).map((s) => {

                return (
                    <div className="alert alert-info " key={s._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-around", borderRadius:"10px"}}>
                        {`${s.name}`}

                        <div className="row">
                            {s.backgroundImage
                                ?
                                <img
                                    alt={s.backgroundImage}
                                    style={{ height: "100px" }}
                                    key={s.backgroundImage}
                                    src={`${process.env.REACT_APP_IMAGES_SLIDER}/${s.backgroundImage}`}
                                    className="m-3"
                                />
                                : <h7 className="m-3 text-danger">нет изображений</h7>
                            }
                        </div>
                        <div className="row">
                            {s.mainImage
                                ?
                                <img
                                    alt={s.mainImage}
                                    style={{ height: "100px" }}
                                    key={s.mainImage}
                                    src={`${process.env.REACT_APP_IMAGES_SLIDER}/${s.mainImage}`}
                                    className="m-3"
                                />
                                : <h7 className="m-3 text-danger">нет изображений</h7>
                            }
                        </div>
                        <div>
                            <span
                                className="btn btn-sm float-right"
                                onClick={() => handleRemove(s.slug, s.name, s.turn)}
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <span
                                className="btn btn-sm float-right"
                            // onClick={() => handleActive(c)}
                            >
                                <CheckSquareOutlined className={s.active ? "text-success" : "text-danger"} />
                            </span>
                            {/* <Link
                                className="btn btn-sm float-right"
                                to={`/admin/slider/${s.slug}`}
                            >
                                <EditOutlined />
                            </Link> */}
                            {/* <span className="float-right btn btn-sm ">{`${s.turn}`}</span> */}
                        </div>
                    </div>
                );
            })}
        </div>
    )


    return (
        <AdminNavigation name={'Слайды'} children={loading ? <Loading /> : ReturnSlide()} />


    )
}

export default CreateSlide