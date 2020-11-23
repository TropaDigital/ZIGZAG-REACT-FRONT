import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'

import WidgetStore from '../../../Store/WidgetStore'

const NavWidgets = (props) => {

    const [secao, setSecao] = useState([])
    const [conteudo, setConteudo] = useState([])
    const [funcao, setFuncao] = useState([])


    const [secaoOpen, setSecaoOpen] = useState(true)
    const [conteudoOpen, setConteudoOpen] = useState(false)
    const [funcaoOpen, setFuncaoOpen] = useState(true)

    useEffect(() => {

        var loadSecao = WidgetStore.getState().filter( obj => 
            obj.template.cat === 'secao'
        )

        var loadConteudo = WidgetStore.getState().filter( obj => 
            obj.template.cat === 'conteudo'
        )

        var loadFuncao = WidgetStore.getState().filter( obj => 
            obj.template.cat === 'funcao'
        )

        setSecao(...[loadSecao])
        setConteudo(...[loadConteudo])
        setFuncao(...[loadFuncao])

    }, [props])

    return(
        <div className="widgets">

            <div className="head">

                <span>Arraste o <b>Widget</b> desejado para o celular ao lado para criar seus templates</span>
                <i></i>

            </div>

            <div className="sections">
            
                <div className="section-parent">
                    <div className="section">

                        <p className={secaoOpen === true ? "opened" : "closed"} onClick={() => secaoOpen === true ? setSecaoOpen(false) : setSecaoOpen(true)}>
                            Adicionar seções
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </p>

                        { secaoOpen === true &&
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
                        }

                    </div>
                    <div className="section">

                        <p className={conteudoOpen === true ? "opened" : "closed"} onClick={() => conteudoOpen === true ? setConteudoOpen(false) : setConteudoOpen(true)}>
                            Adicionar conteúdo
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </p>

                        { conteudoOpen === true &&
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
                        }

                    </div>
                    <div className="section">

                        <p className={funcaoOpen === true ? "opened" : "closed"} onClick={() => funcaoOpen === true ? setFuncaoOpen(false) : setFuncaoOpen(true)}>
                            Adicionar função
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </p>

                        { funcaoOpen === true &&
                            <ReactSortable 
                                animation={150}
                                sort={false}
                                list={funcao} 
                                setList={() => {}}
                                group={
                                    {
                                        name: 'shared',
                                        pull: 'clone',
                                        put: false
                                    }
                                }
                            >
                                {funcao.map((row, key) => (
                                    <div className="item" key={key}>
                                        <i className={row.template.ico}></i>
                                        <span>{row.template.name}</span>
                                    </div>
                                ))}
                            </ReactSortable>
                        }

                    </div>
                </div>

                <div className="button-footer-widgets">

                    <button className="restart" onClick={props.handleResetTemplate}>
                        Limpar tudo
                    </button>

                    <button className="save" onClick={props.handleSaveTemplate}>
                        Salvar
                    </button>

                </div>

            </div>

        </div>
    )
}

export default NavWidgets