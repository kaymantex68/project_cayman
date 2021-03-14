import React, { useState } from 'react'
import { uploadImage, create } from '../../functions/uploadImages'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'

const UploadBrandImage = ({ name, disabled }) => {
    const [file, setFile] = useState(null)
    const { user } = useSelector(state => ({ ...state }))

    const uploadFile = (e) => {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        formData.append('name', 'file')

        create(name, user.token)
        .then(res => { 
            const slug=res.data.slug
            uploadImage(formData, slug, user.token)
            .then(res => {
                console.log('complete upload')
            })
        })
       
    }

    return (
        <>
            <label
                className="btn btn-primary "
                disabled={disabled}>
                Загрузить изображение
            <input
                    type="file"
                    multiple
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