import React, { useState } from 'react'
import FieldsetWidget from './FieldsetWidget'

const LabelPadding = ({value, onChange, full}) => {

    function handleChange(e){

        var data = []
            data.target = []
            data.target.name = e.target.name
            data.target.value = e.target.value+'px'

        onChange(data)

    }

    return(
        <FieldsetWidget full={full} legend="Margens" className="label-padding">

            <label>
                <span>superior</span>
                <input type="number" name="paddingTop" defaultValue={value.paddingTop ? value.paddingTop.replace('px', '') : value.paddingTop} onChange={(e) => handleChange(e)}/>
            </label>

            <label>
                <span>esquerda</span>
                <input type="number" name="paddingLeft" defaultValue={value.paddingLeft ? value.paddingLeft.replace('px', '') : value.paddingLeft} onChange={(e) => handleChange(e)}/>
            </label>

            <label>
                <span>inferior</span>
                <input type="number" name="paddingBottom" defaultValue={value.paddingBottom ? value.paddingBottom.replace('px', '') : value.paddingBottom} onChange={(e) => handleChange(e)}/>
            </label>
            
            <label>
                <span>direita</span>
                <input type="number" name="paddingRight" defaultValue={value.paddingRight ? value.paddingRight.replace('px', '') : value.paddingRight} onChange={(e) => handleChange(e)}/>
            </label>

        </FieldsetWidget>
    )
    

}
export default LabelPadding