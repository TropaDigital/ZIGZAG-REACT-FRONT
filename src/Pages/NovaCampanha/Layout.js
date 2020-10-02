import React from 'react'

//scss
import './NovaCampanha.scss'
import { Link } from 'react-router-dom'

export default function Layout(props) {

    return(
        <div className="page">

            <h1>Criar Nova Campanha</h1>
            <h2 className="category">SMS</h2>

            <div id="steps">
                <Link to="/nova-campanha" className={props.active === 1 ? 'active' : null}>
                    Passo 01
                    <small>Nome da campanha</small>
                </Link>

                <Link to="/nova-campanha/step2" className={props.active === 2 ? 'active' : null}>
                    Passo 02
                    <small>Customização</small>
                </Link>

                <Link to="/nova-campanha/step3" className={props.active === 3 ? 'active' : null}>
                    Passo 03
                    <small>Público</small>
                </Link>

                <Link to="/nova-campanha/step4" className={props.active === 4 ? 'active' : null}>
                    Passo 04
                    <small>Configuração</small>
                </Link>

                <Link to="/nova-campanha/step5" className={props.active === 5 ? 'active' : null}>
                    Passo 05
                    <small>Publicação</small>
                </Link>
            </div>

            <div className="box">
                {props.children}
            </div>
        </div>
    )

}