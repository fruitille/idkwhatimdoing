import { Collapse, Row, Col, Divider } from 'antd';
import React, { useContext } from 'react'
import { useIntl } from 'react-intl';
import { AnotherContext } from '../../contexts'
import { ELEMENTS } from '../../data/constant';
import CharacterResult from '../atoms/CharacterResult';
import DataManager from '../organisms/DataManager';

const { Panel } = Collapse;

function ResultPage() {

    const { formatMessage } = useIntl()

    const data: Array<CharacterInfo> = require("../../data/character.json") 
    const { inven, version } = useContext(AnotherContext)
    
    const MyCharacter: CharacterInfo[] = data.filter(info => inven.includes(info.id))
    .filter(e => version==="japanese" || !e.jonly)
    const codes = Array.from(new Set(data.map(a => a.code)))

    const sortArray = (array: CharacterInfo[]) => {
        array.sort(function(a, b) { // 오름차순
            return formatMessage({id: a.code}) < formatMessage({id: b.code}) ? -1 
                : formatMessage({id: a.code}) > formatMessage({id: b.code}) ? 1
                : 0;
        });
        array.sort(function(a, b) { // 속성 정렬
            return Math.floor(a.category/10) - Math.floor(b.category/10)
        });
    }

    const renderNo = (free: boolean) => {
        const parsedCodes = codes.filter(code => !MyCharacter.map(a => a?.code).includes(code))
        const parsedData = data.filter(info => parsedCodes.includes(info.code) && info.first && info.free === free)
        .filter(e => version==="japanese" || !e.jonly)

        sortArray(parsedData)

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    const render45 = (free: boolean) => {
        const parsedCodes = codes.filter(code => MyCharacter.filter(a => a?.code===code).length===1 && MyCharacter.filter(a => a?.code===code)[0]?.style==="4.5")
        const parsedData = data.filter(info => info.style==="4.5" && parsedCodes.includes(info.code) && info.free === free)
        .filter(e => version==="japanese" || !e.jonly)

        sortArray(parsedData)

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    const renderCC = (style: string) => {
        let tempIds = [] as number[]
        MyCharacter.forEach((a) => {
            tempIds = tempIds.concat(a?.change || [])
        })
        const parsedIds = Array.from(new Set(tempIds)).filter(id => !inven.includes(id))
        const parsedData = data.filter(info => info.style===style && parsedIds.includes(info.id))

        sortArray(parsedData)

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    const renderElement = (element: number) => {
        const parsedData = MyCharacter.filter(info => element === Math.floor(info.category/10) && info.style !== "4.5")

        sortArray(parsedData)

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }
    

    return (
        <div style={{margin: "0 auto", width:"100%", maxWidth: "1100px"}}>
            <h1>Result</h1>
            <b>{formatMessage({id: "resultalert"})}</b>
            <Divider style={{margin: "10px auto"}}/>
            <DataManager/>
            <Divider style={{margin: "10px auto"}}/>
            <div id="checkresult">
                <Collapse defaultActiveKey={['1', '2', '3', '4']} style={{fontSize: "1rem", fontWeight: 600}}>
                    <Panel header={`${formatMessage({id: "resultmenu1"})} (${renderNo(false).length} + ${renderNo(true).length})`} key="1">
                        <Row justify="center" align="middle" style={{marginBottom:"30px"}}>
                            <Col xs={24} sm={4}><b>Not Free</b></Col>
                            <Col xs={23} sm={20}>{renderNo(false)}</Col>
                            <Divider style={{margin: "15px auto"}}/>
                            <Col xs={24} sm={4}><b>Free</b></Col>
                            <Col xs={23} sm={20}>{renderNo(true)}</Col>
                        </Row>
                    </Panel>
                    <Panel header={`${formatMessage({id: "resultmenu2"})} (${render45(false).length} + ${render45(true).length})`} key="2">
                        <Row justify="center" align="middle" style={{marginBottom:"30px"}}>
                            <Col xs={24} sm={4}><b>Not Free</b></Col>
                            <Col xs={23} sm={20}>{render45(false)}</Col>
                            <Divider style={{margin: "15px auto"}}/>
                            <Col xs={24} sm={4}><b>Free</b></Col>
                            <Col xs={23} sm={20}>{render45(true)}</Col>
                        </Row>
                    </Panel>
                    <Panel header={formatMessage({id: "resultmenu3"})} key="3">
                        <Row align="middle" justify="center" style={{marginTop: "5px"}}>
                            {["ns", "as", "es"].map(style => (
                                <React.Fragment key={style}>
                                    <Col xs={24} sm={4}>
                                        <img src={`images/category/${style}.png`} alt={style} width="40"/>
                                    </Col>
                                    <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"5px"}}>
                                        {renderCC(style)}
                                    </Col>
                                    {style !== "es" ? <Divider style={{margin: "15px auto"}}/> : null}
                                </React.Fragment>
                            ))}     
                        </Row>
                    </Panel>
                    <Panel header={formatMessage({id: "resultmenu4"})} key="4">
                        {ELEMENTS.filter(a => a.id > 0).map(({id, element}) => (
                            <Row key={id} align="middle" justify="center" style={{marginBottom:"5px"}}>
                                <Col xs={24} sm={4}>
                                    {element === "lunatic" ? <>
                                        <b>Lunatic</b><br/>
                                        <b>+</b><br/>
                                    </> : null}
                                    <img alt={element} src={`images/category/${element}.png`} width="40"/>
                                </Col>
                                <Col xs={23} sm={20} style={{textAlign: "left"}}>
                                    {renderElement(id)}
                                </Col>
                                <Divider style={{margin: "15px auto"}}/>
                            </Row>
                        ))}
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}

export default ResultPage
