import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    getWorks,
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

const CreateWork = () => {
    const [works, setWorks]=useState([])
    const [name, setName] = useState("");
    const [coast, setCoast]= useState(null)
    const [active, setActive]=useState(true)
    // filter step 1
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const loadWorks = () => {
        getWorks().then((res) => setWorks(res.data));
    };

    useState(() => {
        loadWorks();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createWork({ name, coast, active }, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`Работа "${name}" создана`);
                setName("");
                setCoast(null)
                loadWorks();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = (_id, name) => {
        if (window.confirm(`Удалить?`)) {
            setLoading(true);
            removeWork(_id, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.warning(`Работа "${name}" удалена!`);
                    loadWorks();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };

    const handleActive = (c) => {
        setLoading(true)
        updateWork(c._id, { name: c.name, coast: c.coast, active: !c.active }, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`Работа "${c.name}" переключена`)
                loadWorks();
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const searched = (filter) => (c) => c.name.toLowerCase().includes(filter);

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
                        Добавить
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
            <hr />
            <LocalSearch filter={filter} setFilter={setFilter} />
            {works.filter(searched(filter)).map((c) => {
                return (
                    <div className="alert alert-primary " key={c._id}>
                        {`${c.name}`}
                        <Link
                            className="btn btn-sm float-right"
                            to={`/admin/work/${c.slug}`}
                        >
                            <EditOutlined />
                        </Link>
                        <span
                            className="btn btn-sm float-right"
                            onClick={() => handleRemove(c._id, c.name)}
                        >
                            <DeleteOutlined className="text-danger" />
                        </span>
                        <span
                            className="btn btn-sm float-right"
                            onClick={() => handleActive(c)}
                        >
                            <CheckSquareOutlined className={c.active ? "text-success" : "text-danger"} />
                        </span>
                        <span className="float-right btn" >{c.coast} р.</span>
                    </div>
                );
            })}
        </div>
    )

    return (
        <AdminNavigation name={'Работы'} children={loading ? <Loading /> : ReturnWork()} />
    );
};

export default CreateWork;
