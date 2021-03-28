import React, { useState, useEffect } from "react";
import classes from "./OurParthners.module.css";
import { getDilers } from "../../functions/diler";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const OurParthners = () => {
    const [dilers, setDilers] = useState([]);

    useEffect(() => {
        console.log('weHere')
        getDilers().then((res) => {
            setDilers(res.data);
        });
    }, []);

    console.log("dilers", dilers);

    return (
        <div className="container-fluid" style={{ textAlign: "-webkit-center" }} >
            <div
                style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", color: "#3C475B", marginTop: "10px" }}
            >
                <span>Мы являемся дилерами</span>
            </div>
            <div className={`container-fluid row ${classes.dilerCard}`} style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}} >
                
                    {dilers.map((d) => {
                        return (
                            <div key={d._id} style={{ display: "flex", alignItems: "center", margin: "10px", minWidth:"250px" }} className={classes.dilerContainer}>
                                <img

                                    alt="logo"
                                    src={`${process.env.REACT_APP_IMAGES_DILER}/${d.fileName}`}
                                    className={classes.dilerImage}
                                />
                                <div style={{ fontSize: "1rem" }}>{d.name}</div>
                            </div>
                        );
                    })}
               
            </div>
        </div>
    );
};

export default OurParthners;
