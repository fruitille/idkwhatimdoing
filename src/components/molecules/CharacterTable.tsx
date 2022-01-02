import { Button, Modal } from 'antd';
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl';
import { AnotherContext } from '../../contexts';
import { ELEMENTS, WEAPONS } from '../../data/constant';
import CharacterTableView from '../atoms/CharacterTableView';
import Downloader from '../atoms/Downloader';

function CharacterTable() {

    const { inven, data, version } = useContext(AnotherContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { formatMessage } = useIntl()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button style={{ height: "35px", width: "110px", fontSize: "0.9rem", fontWeight: 600, margin: 5}} 
            onClick={showModal} type='primary' shape='round'>Table View</Button>
            <Modal title="Table" visible={isModalVisible} onCancel={handleCancel} width="85%"
            okButtonProps={{ style: { display: 'none' } }}>
                <b>{formatMessage({id: "tableinfo"})}</b>
                <br/>
                <Downloader tag='chartable'/>
                <div style={{margin:"20px 0 0 0", overflow:"auto"}}>
                    <table style={{width:1280, backgroundColor:"white", margin: "0 auto"}} id="chartable">
                        <thead>
                            <tr>
                                <th style={{width: 70}}></th>
                                {ELEMENTS.filter(a => a.id > 0).map(({element, id}) => (
                                    <th key={id} style={{width: 240}}>
                                        {element === "lunatic" ? <>
                                            <b style={{fontSize:"1.2rem"}}>Lunatic + </b>
                                        </> : null}
                                        <img style={{width: 50}} src={`images/category/${element}.png`} alt={element}/>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {WEAPONS.filter(a => a.id > 0).map((weapon, index) => (
                                <tr key={index}>
                                    <td>
                                        <img style={{width: 50}} src={`images/category/${weapon.weapon}.png`} alt={weapon.weapon}/>
                                    </td>
                                    {ELEMENTS.filter(a => a.id > 0).map((element, index) => (
                                        <td key={index} className={(weapon.id+element.id)%2===1 ? "odd" : "even"} style={{padding:"5px 0 5px 0"}}>
                                            {data.filter(a => element.id === Math.floor(a.category/10) && weapon.id === a.category%10)
                                            .filter(a => a.style !== "4.5")
                                            .filter(e => version==="japanese" || !e.jonly)
                                            .map((d) => (
                                                <CharacterTableView key={d.id} {...d} have={inven.includes(d.id)}/>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    )
}

export default CharacterTable
