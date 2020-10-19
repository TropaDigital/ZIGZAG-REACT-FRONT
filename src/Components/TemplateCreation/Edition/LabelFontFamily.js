import React, { useEffect, useState } from 'react'
import FieldsetWidget from './FieldsetWidget'

const LabelFontFamily = ({value, onChange, full}) => {

    const Fonts = [
        'Arial',
        'Arial Black',
        'Tahoma',
        'Times New Roman',
        'Titillium Web',
        'Trebuchet MS',
        'Verdana',
        'Webdings',
        'Wingdings',
        'Yu Gothic'
    ]

    const [font, setFont] = useState('')

    useEffect(() => {

        setFont(value)

    }, [value])

    function handleChange(e)
    {

        setFont( e.currentTarget.value )

        var data = []
            data.target = []
            data.target.name = e.currentTarget.name
            data.target.value = e.currentTarget.value

        onChange(data)

    }

    return(
        <FieldsetWidget full={full} legend="Tipografia">
            <select onChange={(e) => handleChange(e)} name="fontFamily" value={font}>
                { Fonts.map((row, key) => 
                    <option key={key}>{row}</option>
                )}
            </select>
        </FieldsetWidget>
    )

}
export default LabelFontFamily