import React from 'react'

const FieldsetWidget = (props) => (

    <fieldset className={props.className}>
        <legend>{props.legend}</legend>
        <div className={props.full ? 'inputs full' : 'inputs'}>
            {props.children}
        </div>
    </fieldset>

)
export default FieldsetWidget