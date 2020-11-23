import React from 'react'

import EditButton from '../../../Images/icos/edit-button-template.png'
import RemoveButton from '../../../Images/icos/remove-button-template.png'

const ButtonWidget = (props) => {

    function remove()
    {
        props.setLoading(true)
        props.removeWidget(props.id)
    }

    return(
        <div className="button-widget-edit">
            <button onClick={() => props.editWidget(props.item, props.id, props.componentEdit)}>
                <span>Editar</span>
                <img src={EditButton}/>
            </button>

            <button onClick={remove}>
                <span>Remover</span>
                <img src={RemoveButton}/>
            </button>
        </div>
    )
}

export default ButtonWidget