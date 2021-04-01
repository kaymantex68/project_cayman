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
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'
import { getBrandPictures } from '../functions/uploadImages'
import classes from './Catalog.module.css'

const { SubMenu, ItemGroup } = Menu;

const Catalog = ({ match, history }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false);
  console.log('filterproducts', filterProducts)
  // filter 
  const [ok, setOk] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [inStock, setInStock] = useState(false)
  const [promotion, setPromotion] = useState(false)
  const [sale, setSale] = useState(false)
  const [sort, setSort] = useState(false)
  const [lider, setLider] = useState(false)
  const [brandFilter, setBrandFilter] = useState('')
  const [changePrice, setChangeprice] = useState(false)
  const { params } = match;
  const { brand, sub, category, filterBrand } = match.params;

  const { filter } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch()
  console.log('brands', brands)
  console.log('-----------------------------------------------')
  console.log('redux price', price)
  console.log('redux sort', sort)
  console.log('redux inStock', inStock)
  console.log('redux promotion', promotion)
  console.log('redux sale', sale)
  console.log('redux lider', lider)
  console.log('redux changerPrice', changePrice)
  console.log('redux brand', brandFilter)
  console.log('-----------------------------------------------')
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
                setFilterProducts(res.data);
                getBrandPictures().then(res => {
                  console.log(res.data)
                  setBrands(res.data)
                  setLoading(false);
                })

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
              setFilterProducts(res.data);
              getBrandPictures().then(res => {
                console.log(res.data)
                setBrands(res.data)
                setLoading(false);
              })
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
            setFilterProducts(res.data);
            getBrandPictures().then(res => {
              console.log(res.data)
              setBrands(res.data)
              setLoading(false);
            })
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
          setFilterProducts(res.data);
          getBrandPictures().then(res => {
            console.log(res.data)
            setBrands(res.data)
            setLoading(false);
          })
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
          setFilterProducts(res.data);
          getBrandPictures().then(res => {
            console.log(res.data)
            setBrands(res.data)
            setLoading(false);
          })
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

  const handleChangeFilter = () => {
    let newProducts = [...products]

    if (price[0] != 0 || price[1] != 0) {
      console.log('we here')
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return (p.coast > price[0]) && (p.coast < price[1])
      })

    }
    // in stock
    if (inStock) {
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return p.inStock === 1
      })
    }

    if (promotion) {
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return p.promotion === true
      })
    }

    if (sale) {
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return p.sale === true
      })
    }

    if (lider) {
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return p.lider === true
      })
    }

    if (changePrice) {
      newProducts = newProducts.filter(p => {
        // console.log(p)
        return p.coast && p.oldCoast
      })
    }

    if (brandFilter) {
      if (brandFilter === "allBrand") {

      } else {
        newProducts = newProducts.filter(p => {
          // console.log(p)
          return p.brandSlug === brandFilter
        })
      }
      
    }


    if (sort === "upCoast")
      newProducts.sort((a, b) => +a.coast > +b.coast ? 1 : -1)
    if (sort === "downCoats")
      newProducts.sort((a, b) => +a.coast < +b.coast ? 1 : -1)
    if (sort === "upAlfa")
      newProducts.sort((a, b) => +a.name > +b.name ? 1 : -1)
    if (sort === "downAlfa")
      newProducts.sort((a, b) => +a.name < +b.name ? 1 : -1)

    setFilterProducts(newProducts)
  }



  const handleChangeReset = () => {
    let newProducts = [...products]
    setPrice([0,0])
    setSort(false)
    setInStock(false)
    setPromotion(false)
    setSale(false)
    setLider(false)
    setChangeprice(false)
    setBrandFilter("allBrand")
    setFilterProducts(newProducts)
  }
  return (
    <>
      <div>
        <NavMenu />
      </div>
      <div className={classes.catalogContainer}>
        <div className={classes.containerFilter}>
          <Menu className={classes.menu} mode="inline" defaultOpenKeys={["filter", "1", "2", "3", "4", "5", "6"]}>
            <SubMenu
              key="filter"
              title={
                <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                  <FilterOutlined /> Фильтр
                </span>
              }
            >
              <SubMenu
                key="1"
                title={
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    <SortAscendingOutlined /> Cортировать по:
                </span>
                }
              >
                <div>
                  <select className="ml-4 mr-4 form-control" style={{ width: "80%", fontSize: "0.9rem" }} onChange={(e) => setSort(e.target.value)}>
                    <option value="all" style={{ fontSize: "0.8rem" }} className="text-center">выберите тип сортировки</option>
                    <option value="upCoast" style={{ fontSize: "0.8rem" }} className="text-center">по возрастанию цены</option>
                    <option value="downCoats" style={{ fontSize: "0.8rem" }} className="text-center">по убыванию цены</option>
                    <option value="upAlfa" style={{ fontSize: "0.8rem" }} className="text-center">по алфавиту A-Z</option>
                    <option value="downAlfa" style={{ fontSize: "0.8rem" }} className="text-center">по алфавиту Z-A</option>
                  </select>
                </div>
              </SubMenu>
              <SubMenu
                key="2"
                title={
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    <SortAscendingOutlined /> Brand
                </span>
                }
              >

                <div>
                  <select className="ml-4 mr-4 form-control" style={{ width: "80%", fontSize: "0.9rem" }} onChange={(e) => setBrandFilter(e.target.value)}>
                    <option value="allBrand" style={{ fontSize: "0.8rem" }} className="text-center">выберите Brand</option>
                    {brands.map(b => {
                      return (
                        <option value={b.slug} selected={b.slug===brandFilter} style={{ fontSize: "0.8rem" }} className="text-center">{b.name}</option>
                      )
                    })}
                    {/* <option value="upCoast" style={{ fontSize: "0.8rem" }}>по возрастанию цены</option>
                    <option value="downCoats" style={{ fontSize: "0.8rem" }}>по убыванию цены</option>
                    <option value="upAlfa" style={{ fontSize: "0.8rem" }}>по алфавиту A-Z</option>
                    <option value="downAlfa" style={{ fontSize: "0.8rem" }}>по алфавиту Z-A</option> */}
                  </select>
                </div>
              </SubMenu>

              <SubMenu
                key="3"
                title={
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
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
                key="4"
                title={
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    <StrikethroughOutlined /> Статус
                </span>
                }
              >
                <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                  <input
                    className="ml-4 mr-4"
                    name="3"
                    type="checkbox"
                    checked={inStock}
                    onChange={e => setInStock(e.target.checked)}
                  />
              В наличии
              </label>
                <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>

                  <input
                    className="ml-4 mr-4"
                    name="3"
                    type="checkbox"
                    checked={promotion}
                    onChange={e => setPromotion(e.target.checked)}
                  />
              Акция
              </label>
                <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                  <input
                    className="ml-4 mr-4"
                    name="3"
                    type="checkbox"
                    checked={sale}
                    onChange={e => setSale(e.target.checked)}
                  />
              Распродажа
              </label>
                <label className="ml-5 mr-4" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>

                  <input
                    className="ml-4 mr-4"
                    name="3"
                    type="checkbox"
                    checked={changePrice}
                    onChange={e => setChangeprice(e.target.checked)}
                  />
              Изменение цены
              </label>
              </SubMenu>

              {/* specification */}
              {/* <SubMenu
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
            </SubMenu> */}
            </SubMenu>
          </Menu>
          <hr />
          <button className="btn btn-sm btn-dark float-right" onClick={handleChangeFilter}>показать</button>
          <button className="btn btn-sm btn-danger float-left" onClick={handleChangeReset}>сбросить</button>
          
        </div>

        <div className={classes.containerProducts}>
          {loading ? (
            <Loading />
          ) : (
            <div
              className="row justify-content-center p-0 m-0"
              style={{ padding: "10px 0 0 0" }}
            >
              {filterProducts.map((p) => {
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
