import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getBrand, updateBrand } from "../../../functions/brand";
import {getSubs} from '../../../functions/sub'
import {getCategories} from '../../../functions/category'
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminNavigation from "../../../components/nav/AdminNavigation";

const BrandUpdate = ({ history, match }) => {
    const [name, setName] = useState("");
    const [turn, setTurn] = useState("");
    const [parent, setParent]= useState('')
    const [brands, setBrands] = useState([]);
    const [active, setActive] = useState(false);
    const [subs, setSubs]=useState([])
    const [categories, setCategories]=useState([])
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
      };

    const loadSubs = () => {
        getSubs().then((res) => setSubs(res.data));
    };


    useEffect(() => {
        loadCategories()
        loadSubs()
        
        getBrand(match.params._id).then((res) => {
            console.log('res.data', res.data)
            setParent(res.data.brand.parent);
            setName(res.data.brand.name);
            setTurn(res.data.brand.turn);
            setActive(res.data.brand.active);
        });
    }, []);

    console.log('sub', subs)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(match.params.slug);
        updateBrand(match.params._id, { name, parent, turn, active }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Брэнд ${name} с номером ${turn} обновлен`);
                history.push("/admin/brand");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const updateBrandForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group p-2">
                    <label>Новое название категории</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="новое название брэнда"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={turn}
                        onChange={(e) => setTurn(e.target.value)}
                        required
                        placeholder="новый порядковый номер в навигационной панели (число)"
                        disabled={loading}
                    />
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || loading}
                    >
                        Обновить
          </button>
                </div>
            </form>
        );
    };

    const comparisonCategorydAndSub = (s, c) => {
        const result =c.filter((cat) => {
          return cat._id === s.parent;
        });
        if (result.length >0) return result[0].name
        return 'ошибка'
      };

    const ReturnUpdateSubForm = () => (
        <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
            <div className="form-group">
                <label>Родительская Sub-категория</label>
                <select name="sub-category" className="form-control" onChange={(e) => setParent(e.target.value)}>
                    <option>выберите Sub-категорию</option>
                    {subs.length > 0 && subs.map(s => {
                        return <option key={s._id} value={s._id} selected={s._id === parent}>
                            {`${s.name} (${comparisonCategorydAndSub(s, categories)})`}
                        </option>
                    })}
                </select>
            </div>
            {updateBrandForm()}
        </div>
    )


    return (
        <AdminNavigation name={"Обновление брэнда"} children={ReturnUpdateSubForm()} />
    );
};

export default BrandUpdate;
