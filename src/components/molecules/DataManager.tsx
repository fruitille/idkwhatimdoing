import { Col } from 'antd'
import React from 'react'
import DataLoader from '../atoms/DataLoader'
import Downloader from '../atoms/Downloader'

function DataManager() {
    return (
        <Col xs={24} sm={6} style={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent: "center"}}>
            <Downloader/>
            <DataLoader/>
        </Col>
    )
}

export default DataManager
