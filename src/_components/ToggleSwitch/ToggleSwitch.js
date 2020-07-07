import React from 'react'
import Switch from 'react-input-switch'

const ToggleSwitch = (props) => (

    <Switch
        value={props.value} onChange={props.setValue}
        styles={{
            button: {
                backgroundColor: 'white'
            },
            trackChecked: {
                backgroundColor: '#44a8ff'
            },
        }}
    />

)
export default ToggleSwitch