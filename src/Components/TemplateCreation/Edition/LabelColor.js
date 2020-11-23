import React, { useEffect, useState } from 'react'

const LabelColor = ({value, name, onChange, color}) => {

    const [colorInput, setColorInput] = useState('')

    useEffect(() => {
        
        setColorInput( color )

    }, [color])

    function handleChange(e)
    {

        setColorInput( e.target.value )

        var data = []
            data.target = []
            data.target.name = name
            data.target.value = e.target.value

        onChange(data)

    }

    return(
        <label className="color-widget">
            <span>{value}</span>
            <div className="bg-color" style={{backgroundColor: colorInput}}>
                <input name={name} onChange={(e) => handleChange(e)} type="color" defaultValue={colorInput}/>
            </div>
        </label>
    )

}
export default LabelColor