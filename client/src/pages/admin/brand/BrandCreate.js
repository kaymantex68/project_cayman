import React, { useState, useEffect, useCallback } from "react";
// import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getBrands,
  createBrand,
  removeBrand,
  updateBrand,
} from "../../../functions/brand";
import { getSubs } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import LocalSearch from "../../../components/form/LocalSearch";
import AdminNavigation from "../../../components/nav/AdminNavigation";

const BrandCreate = () => {
  const [name, setName] = useState("");
  const [turn, setTurn] = useState("");
  const [parent, setParent] = useState("");
  const [brands, setBrands] = useState([]);
  const [sub, setSub] = useState([]);
  const [subs, setSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  // filter step 1
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const loadBrands = () => {
    getBrands().then((res) => setBrands(res.data));
  };

  // const loadSubs = () => {
  //   getSubs().then((res) => setSubs(res.data));
  // };

  // const loadCategories = () => {
  //   getCategories().then((res) => setCategories(res.data));
  // };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data)
      getSubs().then((res) => { 
        setSubs(res.data)
        getBrands().then((res) => {
          setBrands(res.data)
          console.log('GOOD')
        });
      });
    });
  }, []);

  console.log('category', categories)
  console.log('subs', subs)
  console.log('brand', brands)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createBrand({ name, parent: sub, turn }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Брэнд ${name} с номером ${turn} создан`);
        setName("");
        setTurn("");
        loadBrands();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = (_id, name, turn) => {
    if (window.confirm(`Удалить?`)) {
      setLoading(true);
      removeBrand(_id, user.token)
        .then((res) => {
          setLoading(false);
          toast.warning(`Брэнд ${name} с номером ${turn} удален!`);
          loadBrands();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const handleActive = (b) => {
    setLoading(true);
    console.log('b', b.active)
    updateBrand(
      b._id,
      { name: b.name, turn: b.turn, parent: b.parent, active: !b.active },
      user.token
    )
      .then((res) => {
        setLoading(false);
        // toast.success(`Категория ${c.name} с номером ${c.turn} переключена`)
        loadBrands();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (filter) => (c) => c.name.toLowerCase().includes(filter);

  const brandForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название нового брэнда</label>
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
          <input
            type="text"
            className="form-control"
            value={turn}
            onChange={(e) => setTurn(e.target.value)}
            required
            placeholder="порядковый номер в навигационной панели (число)"
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

  const comparisonCategorydAndSub = (s, c) => {
    const result = c.filter((cat) => {
      return cat._id === s.parent;
    });
    if (result.length > 0) return result[0].name
    return 'ошибка'
  };

  console.log("name", name);
  console.log("turn", turn);
  console.log("parent", parent);

  const ReturnBrand = () => (
    <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
      <div className="form-group">
        <label>Родительская Sub-категория</label>
        <select
          name="sub"
          className="form-control"
          onChange={(e) => setSub(e.target.value)}
        >
          <option>
            Выберите родительскую Sub-категорию (обязательный пункт)
          </option>
          {subs.length > 0 &&
            subs.map((s) => {
              return (
                <option key={s._id} value={s._id}>
                  {`${s.name} (${comparisonCategorydAndSub(s, categories)})`}
                </option>
              );
            })}
        </select>
      </div>
      <br />
      {brandForm()}
      <hr />
      <LocalSearch filter={filter} setFilter={setFilter} />
      {brands.filter(searched(filter)).map((b) => {
        let filterSub = subs.find(sub => {
          return sub._id === b.parent
        })
        return (
          <div class="alert alert-primary " key={b._id}>
            {`${b.name}`}
            <Link
              className="btn btn-sm float-right"
              to={`/admin/brand/${b._id}`}
            >
              <EditOutlined />
            </Link>
            <span
              className="btn btn-sm float-right"
              onClick={() => handleRemove(b._id, b.name, b.turn)}
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <span
              className="btn btn-sm float-right"
              onClick={() => handleActive(b)}
            >
              <CheckSquareOutlined
                className={b.active ? "text-success" : "text-danger"}
              />
            </span>
            <span className="float-right btn btn-sm ">
              {
                filterSub ? filterSub.name : '(sub-категория отсутствует)'
              }
            </span>
            <span className="float-right btn btn-sm ">
              {
                 comparisonCategorydAndSub(filterSub, categories)
              }
            </span>
            <span className="float-right btn btn-sm ">{`${b.turn}`}</span>
          </div>
        );
      })}
    </div>
  );

  return <AdminNavigation name={"Брэнды"} children={ReturnBrand()} />;
};

export default BrandCreate;
