import React from 'react'

const ButtonWidget = (props) => {

    function remove()
    {
        props.setLoading(true)
        props.removeWidget(props.id)
    }

    return(
        <div className="button-widget">
            <button onClick={() => props.editWidget(props.item, props.id, props.componentEdit)}>Editar</button>
            <button onClick={remove}>Remover</button>
        </div>
    )
}

export default ButtonWidget