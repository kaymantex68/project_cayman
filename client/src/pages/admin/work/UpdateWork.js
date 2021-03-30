import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getWork,
    createWork,
    removeWork,
    updateWork,
} from "../../../functions/work";
import Loading from '../../../components/form/LoadingIcon'
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'

const CreateWork = ({match,history}) => {
    const [work, setWork]=useState([])
    const [name, setName] = useState("");
    const [coast, setCoast]= useState(null)
    const [active, setActive]=useState(true)
    // filter step 1
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const loadWork = () => {
        getWork(match.params.slug).then((res) => {
            setWork(res.data)
            setName(res.data.name)
            setCoast(res.data.coast)
            setActive(res.data.active)
        });
    };

    console.log('name', name)

    useState(() => {
        loadWork();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createWork({ name, coast, active }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Работа "${name}" обновлена`);
                // setName("");
                // setCoast(null)
                // loadWork();
                history.push('/admin/work')
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

 

    

    const workForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Название нового вида работ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                        placeholder="название категории"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={coast}
                        onChange={(e) => setCoast(e.target.value)}
                        required
                        placeholder="стоимость работы"
                        disabled={loading}
                    />
                    <br />
                    <button
                        className="btn btn-outline-primary"
                        disabled={!name || loading}
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        );
    };

    const ReturnWork = () => (
        <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
            {/* {loading ? (
                <h6>
                    <LoadingOutlined />
                </h6>
            ) : (
                <h6>Управление "Категориями"</h6>
            )} */}
            <br />
            {workForm()}
        </div>
    )

    return (
        <AdminNavigation name={'Обновление вида работ'} children={loading ? <Loading /> : ReturnWork()} />
    );
};

export default CreateWork;
