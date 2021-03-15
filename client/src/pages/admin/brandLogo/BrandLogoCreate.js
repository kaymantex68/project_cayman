import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getBrands,
    createBrand,
    removeBrand,
    updateBrand,
} from "../../../functions/brand";
import { getCategories } from "../../../functions/category";
import { getSubs } from "../../../functions/sub";
import { uploadImage, create, getBrandPictureInfo, getBrandPictures } from '../../../functions/uploadImages'
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
    EditOutlined,
    DeleteOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import LocalSearch from "../../../components/form/LocalSearch";
import AdminNavigation from "../../../components/nav/AdminNavigation";
import UploadBrandImage from "../../../components/form/UploadBrandPicture";
import { Avatar, Badge } from 'antd'

const BrandLogoCreate = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null)
    const [logos, setLogos] = useState([])
    const [pictureOk, setPictureOk] = useState(false)
    const [fileName, setFileName] = useState('')

    const [loading, setLoading] = useState(false);
    // filter
    const [filter, setFilter] = useState("");
    // selector
    const { user } = useSelector((state) => ({ ...state }));

    const loadLogos = () => {
        getBrandPictures()
            .then(res => {
                setLogos(res.data)
            })
    }

    console.log('env', process.env.REACT_IMAGES_BRAND)
    useEffect(() => {
        name && getBrandPictureInfo(name)
            .then(res => {
                if (res.data) {
                    setFileName(res.data.fileName)
                    setPictureOk(true)
                } else {
                    setFileName('')
                    setPictureOk(false)
                }
            })
    }, [name])

    // get categories, subs and brands
    useState(() => {
        loadLogos()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData()
        formData.append('image', file)
        formData.append('name', 'file')
        create(name, user.token)
            .then(res => {
                const slug = res.data.slug
                uploadImage(formData, slug, user.token)
                    .then(res => {
                        loadLogos()
                        console.log('complete upload')
                        setName('')
                        setLoading(false)
                    })
            })
    }



    const UploadImage = () => {
        return (
            <>
                <div className="row">
                    {pictureOk && (
                        <img src={`${process.env.REACT_APP_IMAGES_BRAND}/${fileName}`} style={{ maxWidth: "150px", paddingLeft: "20px" }} />
                    )}
                </div>
                <label className="btn btn-primary p-0" disabled={!name || loading}>
                    Загрузить изображение
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        disabled={!name || loading}
                    />
                </label>
                <br />
            </>
        )
    }

    const brandForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название нового Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название брэнда"
                        disabled={loading}
                    />
                    <br />
                    {/* <UploadBrandImage name={name} disabled={!name || loading} /> */}
                    {UploadImage()}
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || loading}
                    >
                        Добавить
                    </button>
                </div>
            </form>
        );
    };
    
    const ReturnBrand = () => (
        <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
            {brandForm()}
            <hr />
            {loading
            ? <h4>загрузка</h4>
            : logos.map(l => (
                <img key={l._id} src={`${process.env.REACT_APP_IMAGES_BRAND}/${l.fileName}`} style={{ maxWidth: "100px", margin: "10px" }} />
            ))
            }
        </div>
    );

    return (
        // put retrn into admin sidebar
        <AdminNavigation name="Brand" children={ReturnBrand()} />
    );
};

export default BrandLogoCreate;
