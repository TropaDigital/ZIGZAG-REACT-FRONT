import React, {useEffect, useState} from 'react'
import FieldsetWidget from './FieldsetWidget'
import RangeSlider from 'react-bootstrap-range-slider'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

const LabelLineHeight = ({value, onChange, full}) => {

    const [valueInput, setValueInput] = useState(0)

    useEffect(() => {

        if ( value ){
            setValueInput( value.replace('px', '') )
        }

    }, [value])

    function changeFont(e)
    {

        var value = e.target.value
        setValueInput(value)

        var data = []
            data.target = []
            data.target.name = 'lineHeight'
            data.target.value = value+'px'

        onChange(data)

    }

    return(
        <FieldsetWidget full={full} legend="Altura da linha"  className="label-line-height">

            <div style={{width: '70%'}}>
                <RangeSlider
                    value={valueInput}
                    name="lineHeight"
                    min={8}
                    max={28}
                    onChange={e => changeFont(e)}
                    tooltip={'off'}
                />
            </div>
            
            <div className="value-ranger">{valueInput}</div>

        </FieldsetWidget>
    )

}
export default LabelLineHeight