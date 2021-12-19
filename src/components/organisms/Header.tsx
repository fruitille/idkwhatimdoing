import React, { useContext } from 'react'
import { Button, Col, Radio, Row, Select } from 'antd';
import { AnotherContext } from '../../contexts';
import DataManager from '../molecules/DataManager';

const { Option } = Select;

function Header() {

    const { lang, result, version, changeLang, changeVersion, changeResult } = useContext(AnotherContext)

    return (
        <Row align="middle" justify="center" gutter={[10, 10]} style={{margin: "5px auto", maxWidth: "1000px"}}>
            <Col xs={24} sm={12} style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                <a href="https://hu-lee.github.io/anotherdungeon/" rel="noreferrer" target="_blank">
                    <Button style={{ height: "50px", lineHeight: "35px",fontSize: "1.4rem", fontWeight: 600, margin: 5}}>
                        <div style={{display: "block", justifyContent: "center"}}>
                            <img src="images/dungeon.png" style={{width: "40px", height: "40px", marginRight: "10px"}} alt="logo"/>
                            Dungeon
                        </div>
                    </Button>
                </a>
                <Button style={{ height: "50px", width: "110px", fontSize: "1.2rem", fontWeight: 600, margin: 5}} type="primary" onClick={changeResult}>
                    {result ? "Checklist" : "Result"}
                </Button>
            </Col>
            <Col xs={24} sm={6} style={{display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                <b>Language</b>
                <Radio.Group defaultValue={lang} onChange={(e) => changeLang(e.target.value)}>
                    <Radio.Button value="ko">KOR</Radio.Button>
                    <Radio.Button value="jp">JAP</Radio.Button>
                    <Radio.Button value="en">ENG</Radio.Button>
                </Radio.Group>
            </Col>
            {!result ? 
            <Col xs={24} sm={6} style={{display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
                <b>Version</b>
                <Select defaultValue={version} onChange={(value) => changeVersion(value)} style={{minWidth: 100}}>
                    <Option value="global">GLOBAL (2.10.200)</Option>
                    <Option value="japanese">JAPAN (2.11.50)</Option>
                </Select>
            </Col>
            : <DataManager/>}
        </Row>
    )
}

export default Header
