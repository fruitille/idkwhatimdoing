import { Card } from 'antd'
import React from 'react'
import { useIntl } from 'react-intl'
import CharacterSelect from '../atoms/CharacterSelect'

const CharacterGroup:React.FC<InfoProps> = ({array}) => {

    const { formatMessage } = useIntl()

    return (
        <Card
            bodyStyle= {{padding: "5px 2px 5px 2px"}} 
            style={{width: '275px', margin: '1px auto', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center'}} size="small">
            <b>{formatMessage({id: array[0].code})}</b>    
            <div style={{marginTop: 3}}>               
                {array.map(info => (
                    <CharacterSelect key={info.id} {...info}/>
                ))}
            </div>         
        </Card>
    )
}

export default CharacterGroup
