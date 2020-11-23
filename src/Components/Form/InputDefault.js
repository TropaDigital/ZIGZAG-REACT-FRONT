import React from 'react'

const InputDefault = (props) => (

    <label className="input-default-zig">
        <span>{props.title}</span>
        <input 
            readOnly={props.readOnly} 
            type={props.type ? props.type : 'text'} 
            onChange={(e) => props.onChange(props.name, e.target.value)} 
            defaultValue={props.value} 
            placeholder={props.placeholder ? props.placeholder : props.title}
        />
    </label>

)

export default InputDefault