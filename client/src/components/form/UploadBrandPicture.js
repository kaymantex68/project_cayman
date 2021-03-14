import React, { useState, useEffect } from 'react'
import { uploadImage, create, getBrandPictureInfo } from '../../functions/uploadImages'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'

const UploadBrandImage = ({ name, disabled }) => {
    const [file, setFile] = useState(null)
    const { user } = useSelector(state => ({ ...state }))
    const [pictureOk, setPictureOk]=useState(false)
    const[fileName,setFileName]=useState('')

    useEffect(()=>{
        console.log('change')
        name && getBrandPictureInfo(name)
        .then(res=>{
            if(res.data) {
                setFileName(res.data.fileName)
                setPictureOk(true)
            } else{
                setFileName('')
                setPictureOk(false)
            }
        })
    },[name])

    console.log(fileName, pictureOk)

    const uploadFile = (e) => {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        formData.append('name', 'file')

        create(name, user.token)
            .then(res => {
                const slug = res.data.slug
                uploadImage(formData, slug, user.token)
                    .then(res => {
                        console.log('complete upload')
                    })
            })

    }


    return (
        <>
            <div className="row">
                {pictureOk && 
                    <Avatar
                        shape="square"
                        src={`/images/brand/${fileName}`}
                        size={100}
                        className="ml-3"
                    />
                }
            </div>
            <label
                className="btn btn-primary "
                disabled={disabled}>
                Загрузить изображение
            <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={uploadFile}
                    disabled={disabled}
                />
            </label>
            <br />
        </>
    )
}

export default UploadBrandImage