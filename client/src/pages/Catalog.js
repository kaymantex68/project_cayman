import React, { useState, useEffect } from "react";
import {
  getProducts,
  getProductsFromCategory,
  getProductsFilter,
} from "../functions/catalog";
import { getCategory } from "../functions/category";
import { getSubsSlug } from "../functions/sub";
import SubUpdate from "./admin/sub/SubUpdate";
import Loading from "../components/form/LoadingIcon";
import NavMenu from "../components/nav/NavMenu";
import ProductCard from "../components/card/ProductCard";
import Footer from "../components/footer/Footer";
import { Menu, Slider, Checkbox, Tooltip } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  StrikethroughOutlined,
  SmallDashOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'

import classes from './Catalog.module.css'

const { SubMenu, ItemGroup } = Menu;

const Catalog = ({ match, history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // filter 
  const [ok, setOk] = useState(false)
  const [price, setPrice] = useState([0, 0])

  const { params } = match;
  const { brand, sub, category, filterBrand } = match.params;

  const { filter } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch()

  console.log('redux filter', filter)
  // console.log('products', products)
  // console.log('match', match)
  // console.log('history', history)

  // useEffect(() => {
  //   if (filter.priceFilter) {
  //     let filterProducts = [...products]
  //     filterProducts = filterProducts.filter(p => {
  //       return p.coast >= filter.priceFilter[0] && p.coast <= filter.priceFilter[1]
  //     })
  //     setProducts(filterProducts)
  //   }
  // }, [ok])
  // console.log('ok', ok)

  useEffect(() => {
    setLoading(true);
    if (brand) {
      setProducts([]);
      let catObject;
      let subArray;
      setProducts([]);
      getCategory(category)
        .then((res) => {
          catObject = { ...res.data.category };
          getSubsSlug(sub).then((res) => {
            subArray = [...res.data];
            const subObject = subArray.find((s) => s.parent === catObject._id);
            // we need to get Products with two parametrs category._id and
            // sub._id
            //------------------------------------------>
            // console.log('category +++++++++', catObject)
            // console.log('sub +++++++++', subObject)
            getProductsFilter(catObject._id, subObject._id, brand).then(
              (res) => {
                setProducts(res.data);
                setLoading(false);
              }
            );
          });
        })
        .catch((err) => {
          console.log("err get category--------->", err);
          setLoading(false);
        });
    } else if (sub) {
      console.log("sub");
      let catObject;
      let subArray;
      setProducts([]);
      getCategory(category)
        .then((res) => {
          catObject = { ...res.data.category };
          getSubsSlug(sub).then((res) => {
            subArray = [...res.data];
            const subObject = subArray.find((s) => s.parent === catObject._id);
            // we need to get Products with two parametrs category._id and
            // sub._id
            //------------------------------------------>
            // console.log('category +++++++++', catObject)
            // console.log('sub +++++++++', subObject)
            getProductsFilter(catObject._id, subObject._id).then((res) => {
              setProducts(res.data);
              setLoading(false);
            });
          });
        })
        .catch((err) => {
          console.log("err get category--------->", err);
          setLoading(false);
        });
    } else if (category) {
      console.log("category");
      setProducts([]);
      getCategory(category)
        .then((res) => {
          getProductsFilter(res.data.category._id).then((res) => {
            setProducts(res.data);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log("err get category--------->", err);
          setLoading(false);
        });
    } else if (filterBrand) {
      console.log("weHere");
      getProductsFilter(null, null, null, null, filterBrand)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err--------->", err);
          setLoading(false);
        });
    } else if (!brand && !sub && !category && !filterBrand) {
      console.log("catalog");
      getProductsFilter()
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err--------->", err);
          setLoading(false);
        });
    }
  }, [brand, sub, category, filterBrand]);

  //----------------------------------------------fiter--------------------------------------------------
  // handleSlider
  const handleSlider = (value) => {
    setPrice(value)
    dispatch({
      type: 'SET_FILTER',
      payload: { ...filter, priceFilter: value }
    })
  }
  //nahdleInStock

  return (
    <>
      <div>
        <NavMenu />
      </div>
      <div className={classes.catalogContainer}>
        <div className={classes.containerFilter}>
          <Menu className={classes.menu} mode="inline" defaultOpenKeys={["1", "2", "3"]}>
          <SubMenu
              key="filter"
              title={
                <span style={{ fontSize: "1rem", fontWeight:"bold" }}>
                  <FilterOutlined /> Фильтр
                </span>
              }
            >
          <SubMenu
              key="1"
              title={
                <span style={{ fontSize: "0.8rem", fontWeight:"bold" }}>
                  <SortAscendingOutlined /> Cортировать по:
                </span>
              }
            >

              <div>
                <select className="ml-4 mr-4 form-control" style={{width:"80%", fontSize:"0.9rem"}}>
                  <option style={{fontSize:"0.8rem"}}></option>
                  <option style={{fontSize:"0.8rem"}}>по возрастанию цены</option>
                  <option style={{fontSize:"0.8rem"}}>по убыванию цены</option>
                  <option style={{fontSize:"0.8rem"}}>по алфавиту A-Z</option>
                  <option style={{fontSize:"0.8rem"}}>по алфавиту Z-A</option>
                </select>
              </div>
            </SubMenu>
            {/* price */}

            <SubMenu
              key="2"
              title={
                <span style={{ fontSize: "0.8rem", fontWeight:"bold"  }}>
                  <DollarOutlined /> Цена
                </span>
              }
            >

              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `${v} р.`}
                  range value={price}
                  onChange={handleSlider}
                  max="21000"
                />
              </div>
            </SubMenu>
            {/* inStock */}
            <SubMenu
              key="3"
              title={
                <span style={{ fontSize: "0.8rem", fontWeight:"bold"  }}>
                  <StrikethroughOutlined /> Статус
                </span>
              }
            >
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              В наличии
              </label>
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>

                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              Акция
              </label>
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              Распродажа
              </label>
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>

                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              Изменение цены
              </label>
            </SubMenu>

            {/* specification */}
            <SubMenu
              key="4"
              title={
                <span style={{ fontSize: "0.8rem" , fontWeight:"bold" }}>
                  <SmallDashOutlined /> Характеристики
                </span>
              }
            >
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                <input
                  className="ml-4 mr-4"
                  name="wifi"
                  type="checkbox"
                />
              Wi-Fi
              </label>
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              Ip
              </label>
              <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                <input
                  className="ml-4 mr-4"
                  name="3"
                  type="checkbox"
                />
              AHD-CVI-TVI
              </label>
            </SubMenu>
            </SubMenu>
          </Menu>
          <hr/>
          <button className="btn btn-sm btn-dark float-right">показать</button>
        </div>

        <div className={classes.containerProducts}>
          {loading ? (
            <Loading />
          ) : (
            <div
              className="row justify-content-center p-0 m-0"
              style={{ padding: "10px 0 0 0" }}
            >
              {products.map((p) => {
                return <ProductCard product={p} />;
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Catalog;
