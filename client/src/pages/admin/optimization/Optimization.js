import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from '../../../components/form/LoadingIcon'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import { getProducts, removeUnusedFile } from '../../../functions/product'
import { TrademarkOutlined } from "@ant-design/icons";
import { getPictureFromFolder } from '../../../functions/optimization'
import { stubFalse } from "lodash";


const Optimization = ({ history }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [picturesProduct, setPicturesProduct] = useState([])
    const [picturesFolder, setPicturesFolder] = useState([])
    const [uniq, setUniq] = useState([])
    const { user } = useSelector((state) => ({ ...state }));



    useEffect(() => {
        setLoading(true)
        let arrPictures = []
        getProducts().then(res => {
            setProducts(res.data)
            res.data.map(p => {
                if (p.images.length > 0) arrPictures = ([...arrPictures, ...p.images])
            })
            setPicturesProduct([...picturesProduct, ...arrPictures])
            getPictureFromFolder().then(res => setPicturesFolder(res.data.pictures))
            setLoading(false)
        })
    }, [])

    // console.log('pictures product', picturesProduct)
    // console.log('pictures folder', picturesFolder)
    console.log('uniq', uniq)

    const ReturnImage = (u) => {

        return (
            <div className="m-2">
                <img
                    alt={u}
                    style={{ maxHeight: "100px", maxWidth: "80px" }}

                    src={`${process.env.REACT_APP_IMAGES_PRODUCTS}/${u}`}
                    className="m-1"
                />
                {/* <div  style={{ width: "0.8rem" }}>{u}</div> */}
            </div>

        )
    }

    const handleRemove = (e, uniqPicture) => {
        e.preventDefault()
        const promiseDelete = new Promise((resolve, reject) => {
            let load=true;
            for (let i = 0; i < uniqPicture.length; i++) {
                removeUnusedFile(uniqPicture[i], user.token)
                    .then(res => console.log(res.data))
            }
            load=false;
            !load && resolve();
        });

        promiseDelete.then(()=>{window.location.reload()})

        
    }

    const ReturnOptimization = () => {

        const uniqPicture = picturesFolder.filter((a) => picturesProduct.indexOf(a) === 0 - 1 && a !== 'default.png')
        // console.log('uniq', uniqPicture)
        return (
            <div className="form-group">
                <br/>
                <button
                    className="btn btn-outline-primary"
                    onClick={(e) => handleRemove(e, uniqPicture)}
                >
                    Удалить неиспльзуемые картинки
                </button>
                <hr />
                <div className="row">
                    {uniqPicture.map(u => {
                        return (
                            <div className="form-group" key={u}>
                                {ReturnImage(u)}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


    return (
        <AdminNavigation name={'Неиспользуемые изображения'} children={loading ? <Loading /> : ReturnOptimization()} />
    );
}

export default Optimization;