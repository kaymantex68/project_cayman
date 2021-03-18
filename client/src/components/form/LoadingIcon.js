import React from 'react'

import {
    LoadingOutlined
} from "@ant-design/icons";

const Loading =()=>(
    <div className="container-fluid" style={{ minHeight: "50%", display: "flex", justifyContent: "center", alignItems:"center"}}>
        <LoadingOutlined style={{fontSize:"3rem"}}/>
    </div>
)

export default Loading