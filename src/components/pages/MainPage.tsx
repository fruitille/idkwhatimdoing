import { Col, Row, Select, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { ELEMENTS, WEAPONS } from '../../data/constant'
import CheckComponent from '../organisms/CheckComponent'

const { Option } = Select;
const { Search } = Input;

function MainPage() {

    const data: Array<CharacterInfo> = require("../../data/character.json") 

    const { formatMessage } = useIntl()
    const { version } = useContext(AnotherContext)

    const [Element, setElement] = useState(0)
    const [Weapon, setWeapon] = useState(0)
    const [SearchName, setSearchName] = useState("")

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    }

    const filtered = data.filter(e => SearchName==="" || formatMessage({id: e.code}).toLowerCase().includes(SearchName.toLowerCase()))
    .filter(e => Element===0 || Math.floor(e.category/10)===Element)
    .filter(e => Weapon===0 || Math.floor(e.category%10)===Weapon)
    .filter(e => version==="japanese" || !e.jonly)

    return (
        <div style={{margin: "10px auto", width:"100%", maxWidth: "1400px"}}>
            <Row align="middle" justify="center" gutter={[10, 10]} style={{margin: "5px auto", maxWidth: "1200px"}}>
                <Col span={24} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent: "center", margin: "0 auto"}}>
                    <b>Filter</b>
                    <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}>
                        <Select defaultValue={0} onChange={(value) => setElement(value)} style={{width:"120px", margin:3}}>
                            {ELEMENTS.map(({id, element}) => (
                                <Option value={id} key={id}>{formatMessage({id: element})}</Option>
                            ))}
                        </Select>
                        <Select defaultValue={0} onChange={(value) => setWeapon(value)} style={{width:"120px", margin:3}}>
                            {WEAPONS.map(({id, weapon}) => (
                                <Option value={id} key={id}>{formatMessage({id: weapon})}</Option>
                            ))}
                        </Select>
                        <Search style={{width:"246px", margin: "0.2rem 8px 1rem 8px"}} 
                        placeholder="캐릭터 이름" 
                        value={SearchName} 
                        onChange={HandleChange}
                        enterButton />
                    </div>
                </Col>
            </Row>
            <CheckComponent array={filtered}/>
        </div>
    )
}

export default MainPage
