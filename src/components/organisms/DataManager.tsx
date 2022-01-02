import { Col } from 'antd'
import React from 'react'
import DataLoader from '../atoms/DataLoader'
import Downloader from '../atoms/Downloader'
import CharacterTable from '../molecules/CharacterTable'

function DataManager() {
    return (
        <Col xs={24} style={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent: "center"}}>
            <Downloader tag='checkresult'/>
            <DataLoader/>
            <CharacterTable/>
        </Col>
    )
}

export default DataManager
