import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getBrands,
  createBrand,
  removeBrand,
  updateBrand
} from "../../../functions/brand";
import {
  getCategories,
} from "../../../functions/category";
import {
  getSubs,
} from "../../../functions/sub";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import LocalSearch from '../../../components/form/LocalSearch'
import AdminNavigation from '../../../components/nav/AdminNavigation'
import UploadBrandImage from '../../../components/form/ShowBrandPicture'

const BrandCreate = () => {

  const [name, setName] = useState("");
  const [turn, setTurn] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('all')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false);
  // filter 
  const [filter, setFilter] = useState("");
  // selector
  const { user } = useSelector((state) => ({ ...state }));

  const loadBrands = () => {
    getBrands().then((res) => setBrands(res.data));
  }
  // get categories, subs and brands
  useState(() => {
    getCategories().then((res) => {
      setCategories(res.data)
      getSubs().then((res) => {
        setSubs(res.data)
        getBrands().then((res) => { 
          setBrands(res.data)
        });
      });
    }
    );
  }, []);
  // send form data
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
  // delete brand
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
  // active or disactive brand
  const handleActive = (b) => {
    setLoading(true)
    updateBrand(b._id,
      { name: b.name, turn: b.turn, parent: b.parent, active: !b.active },
      user.token)
      .then(res => {
        setLoading(false)
        // toast.success(`Категория ${c.name} с номером ${c.turn} переключена`)
        loadBrands();
      })
      .catch(err => {
        setLoading(false)
        if (err.response.status === 400) toast.error(err.response.data)
      })
  }
  // filter (searched)
  const searched = (filter) => (b) => {
    if (b.parent === sub)  return b.name.toLowerCase().includes(filter)
    if (sub === 'all') return b.name.toLowerCase().includes(filter)
  }
  // brand form return
  const brandForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название нового Брэнда</label>
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
          <br/>
          <UploadBrandImage name={name}  disabled={!name || !turn || sub ==='all' || loading}/>
          <br />
          <button
            className="btn btn-outline-primary"
            disabled={!name || sub === 'all' || !turn || loading}
          >
            Добавить
          </button>
        </div>
      </form>
    );
  };
  // compare and find parent
  const findSubInCategory = (_sub, _categories) => {
    return _categories.find(_c => {
      return _c._id === _sub.parent
    })
      ? _categories.find(_c => {
        return _c._id === _sub.parent
      }).name
      : 'категория не найдена'
  }
  // main function
  const ReturnBrand = () => (
    <div className="col md-5" style={{ backgroundColor: "GhostWhite" }}>
      <div className="form-group">
        <label>Родительская sub-категория</label>
        <select name="subcategory" className="form-control" onChange={(e) => setSub(e.target.value)}>
          <option value="all">Выберите родительскую sub-категорию (обязательный пункт)</option>
          {subs.length > 0 && subs.map(s => {
            return (
              <option key={s._id} value={s._id}>
                {`${s.name} (${findSubInCategory(s, categories)})`}
              </option>
            )
          })}
        </select>
      </div>
      {brandForm()}
      <hr />
      <LocalSearch filter={filter} setFilter={setFilter} />
      {/* filter */}
      {brands.filter(searched(filter)).map((b) => {
        let filterSubs = subs.find(_sub => {
          return _sub._id === b.parent
        })

        return (
          <div className="alert alert-primary " key={b._id}>
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
            <span className="float-right btn btn-sm ">{`${b.turn}`}</span>
            <span
              className="btn btn-sm float-right"
              onClick={() => handleActive(b)}
            >
              <CheckSquareOutlined className={b.active ? "text-success" : "text-danger"} />
            </span>
            <span className="float-right btn btn-sm ">
              {
                filterSubs ? filterSubs.name : '(категория отсутствует)'
              }
            </span>
            <span className="float-right btn btn-sm ">
              {findSubInCategory(filterSubs, categories)}
            </span>
          </div>
        );
      })}
    </div>
  )


  return (
    // put retrn into admin sidebar
    <AdminNavigation name="Brand" children={ReturnBrand()} />
  );
};

export default BrandCreate;
