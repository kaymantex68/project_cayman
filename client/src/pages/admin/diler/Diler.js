import React, { useState, useEffect, useCallback } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getDilers,
  createDiler,
  removeDiler,
  updateDiler,
} from "../../../functions/diler";
import { getCategories } from "../../../functions/category";
import { getSubs } from "../../../functions/sub";
import {
  uploadImage,
  create,
  getDilerPictureInfo,
  getDilerPictures,
  removeDilerPicture,
} from "../../../functions/diler";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import LocalSearch from "../../../components/form/LocalSearch";
import AdminNavigation from "../../../components/nav/AdminNavigation";
import UploadDilerImage from "../../../components/form/ShowBrandPicture";
import { Avatar, Badge } from "antd";

const Diler = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [logos, setLogos] = useState([]);
  const [pictureOk, setPictureOk] = useState(false);
  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(false);
  // filter
  const [filter, setFilter] = useState("");
  // selector
  const { user } = useSelector((state) => ({ ...state }));

  console.log('logos', logos)

  const loadLogos = () => {
    getDilerPictures().then((res) => {
      setLogos(res.data);
    });
  };

  console.log("env", process.env.REACT_IMAGES_BRAND);
  useEffect(() => {
    name &&
      getDilerPictureInfo(name).then((res) => {
        if (res.data) {
          setFileName(res.data.fileName);
          setPictureOk(true);
        } else {
          setFileName("");
          setPictureOk(false);
        }
      });
  }, [name]);

  // get categories, subs and Dilers
  useState(() => {
    loadLogos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("image", file);
    formData.append("name", "file");
    create(name, user.token).then((res) => {
      const slug = res.data.slug;
      uploadImage(formData, slug, user.token).then((res) => {
        loadLogos();
        console.log("complete upload");
        setName("");
        setLoading(false);
      });
    });
  };

  const UploadImage = () => {
    return (
      <>
        <div className="row">
          {pictureOk && (
            <img
              src={`${process.env.REACT_APP_IMAGES_DILER}/${fileName}`}
              style={{ maxWidth: "150px", paddingLeft: "20px" }}
            />
          )}
        </div>
        <label className="btn btn-primary p-0" disabled={!name || loading}>
          {`Загрузить изображение `}
          <input
            type="file"
            // hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={!name || loading}
          />
        </label>
        <br />
      </>
    );
  };

  const removeLogo = (l) => {
    //   setLoading(true)
    if (window.confirm(`Удалить?`)) {
      removeDilerPicture(l.slug, user.token)
        .then((res) => {
          toast.warning(`Дилер "${l.name}" удален!`);
          // setLoading(false)
          loadLogos();
        })
        .catch((err) => console.log(err));
    }
  };

  const DilerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontWeight: "bold" }}>Название нового дилера</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            placeholder="название дилера"
            disabled={loading}
          />
          <br />
          {/* <UploadDilerImage name={name} disabled={!name || loading} /> */}
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

  const ReturnDiler = () => {
    return (
      <div className="col md-5" style={{ backgroundColor: "white" }}>
        {DilerForm()}
        <hr />
        {loading ? (
          <h4>загрузка</h4>
        ) : (
          logos.map((l) => (
            <Badge
              key={l.public_id}
              count="X"
              onClick={() => {
                removeLogo(l);
              }}
              style={{ cursor: "pointer" }}
              className="m-3"
            >
              <img
                key={l._id}
                alt="logo"
                src={`${process.env.REACT_APP_IMAGES_DILER}/${l.fileName}`}
                style={{ maxWidth: "100px", margin: "10px" }}
              />
            </Badge>
          ))
        )}
      </div>
    );
  };

  return (
    // put retrn into admin sidebar
    <AdminNavigation name="Diler logo" children={ReturnDiler()} />
  );
};

export default Diler;
