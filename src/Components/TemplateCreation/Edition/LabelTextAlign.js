import React, { useEffect, useState } from 'react'
import FieldsetWidget from './FieldsetWidget'

const LabelTextAlign = ({value, onChange, full}) => {

    const [alignInput, setAlignInput] = useState('')

    useEffect(() => {
        
        setAlignInput( value )

    }, [value])

    function handleChange(e)
    {


        setAlignInput( e.currentTarget.value )

        var data = []
            data.target = []
            data.target.name = e.currentTarget.name
            data.target.value = e.currentTarget.value

        onChange(data)

    }

    return(
        <FieldsetWidget full={full} legend="Alinhamento" className="label-text-align">

            <button className={alignInput === 'left' ? 'active' : ''} type="button" name="textAlign" value="left" onClick={(e) => handleChange(e)}>
                <i className="fa fa-align-left" aria-hidden="true"></i>
            </button>

            <button className={alignInput === 'center' ? 'active' : ''} type="button" name="textAlign" value="center" onClick={(e) => handleChange(e)}>
                <i className="fa fa-align-center" aria-hidden="true"></i>
            </button>

            <button className={alignInput === 'right' ? 'active' : ''} type="button" name="textAlign" value="right" onClick={(e) => handleChange(e)}>
                <i className="fa fa-align-right" aria-hidden="true"></i>
            </button>

            <button className={alignInput === 'justify' ? 'active' : ''} type="button" name="textAlign" value="justify" onClick={(e) => handleChange(e)}>
                <i className="fa fa-align-justify" aria-hidden="true"></i>
            </button>

        </FieldsetWidget>
    )

}
export default LabelTextAlign