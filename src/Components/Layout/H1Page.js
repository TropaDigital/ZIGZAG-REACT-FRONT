import React from 'react'
import { useHistory } from 'react-router-dom'

export default function H1Page(props)
{

    const history = useHistory()

    function handleBackState()
    {

        history.push({
            pathname: '/nova-campanha',
            state: props.state
        })

    }

    return(
        <h1>
            <button onClick={props.state ? handleBackState : () => history.goBack()}>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <span>voltar</span>
            </button>
            {props.nome}
        </h1>
    )

}