import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'

import Image from '../Widgets/Image';
import WidgetStore from '../../../Helper/WidgetStore'

const NavWidgets = (props) => {

    const [secao, setSecao] = useState([])
    const [conteudo, setConteudo] = useState([])

    useEffect(() => {

        var loadSecao = WidgetStore.getState().filter( obj => 
            obj.template.cat === 'secao'
        )

        var loadConteudo = WidgetStore.getState().filter( obj => 
            obj.template.cat === 'conteudo'
        )

        setSecao(...[loadSecao])
        setConteudo(...[loadConteudo])

    }, [props])

    return(
        <div className="widgets">

            <div className="head">
                Arraste o <b>Widget</b> desejado para o celular ao lado para criar seus templates
            </div>

            <div className="sections">
            
                <div className="section">

                    <p>Adicionar seções</p>

                    <ReactSortable 
                        animation={150}
                        sort={false}
                        list={secao} 
                        setList={() => {}}
                        group={
                            {
                                name: 'shared',
                                pull: 'clone',
                                put: false
                            }
                        }
                    >
                        {secao.map((row, key) => (
                            <div className="item" key={key}>
                                <i className={row.template.ico}></i>
                                <span>{row.template.name}</span>
                            </div>
                        ))}
                    </ReactSortable>

                </div>

                <div className="section">

                    <p>Adicionar conteúdo</p>

                    <ReactSortable 
                        animation={150}
                        sort={false}
                        list={conteudo} 
                        setList={() => {}}
                        group={
                            {
                                name: 'shared',
                                pull: 'clone',
                                put: false
                            }
                        }
                    >
                        {conteudo.map((row, key) => (
                            <div className="item" key={key}>
                                <i className={row.template.ico}></i>
                                <span>{row.template.name}</span>
                            </div>
                        ))}
                    </ReactSortable>

                </div>

            </div>

        </div>
    )
}

export default NavWidgets