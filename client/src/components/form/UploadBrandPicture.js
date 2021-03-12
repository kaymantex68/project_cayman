import React, {useState} from 'react'
import { uploadImage } from '../../functions/uploadImages'
import { useSelector } from 'react-redux'

const UploadBrandImage = () => {
    const [file, setFile]=useState(null)
    const { user } = useSelector(state => ({ ...state }))

    
    const uploadFile = (e) => {
        console.log(e.target.files,'-----------------------')
        console.log(e.target.files[0],'-----------------------')
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('image',file)        
        formData.append('name','file')

        uploadImage(formData, user.token)
    }

    return (
        <>
            <label className="btn btn-primary btn-raised">
                Загрузить изображение
            <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={uploadFile}
                />
            </label>
            <br />
        </>
    )
}

export default UploadBrandImage