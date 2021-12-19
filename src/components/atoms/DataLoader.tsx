import { Button } from 'antd'
import React from 'react'

function DataLoader() {

    const dataLoad = () => {
        return alert("준비중입니다.\n\nUnable Now")
    }

    return (
        <Button style={{ height: "35px", width: "110px", fontSize: "0.9rem", fontWeight: 600, margin: 5}} 
        type="dashed"
        onClick={dataLoad}>DataLoader</Button>
    )
}

export default DataLoader
