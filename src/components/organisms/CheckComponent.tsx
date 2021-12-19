import React from 'react'
import CharacterGroup from '../molecules/CharacterGroup'

const CheckComponent:React.FC<InfoProps> = ({array}) => {

    const codes = Array.from(new Set(array.map(a => a.code)))

    return (
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {codes.map(code => (
                <CharacterGroup array={array.filter(a => a.code === code)} key={code}/>
            ))}
        </div>
    )
}

export default CheckComponent

