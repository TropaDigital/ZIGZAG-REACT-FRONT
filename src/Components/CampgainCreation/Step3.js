import Icon from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../Api/app'
import messageStore from '../../Store/MessageStore'
import EditList from '../ContactList/EditList'
import IconButton from '../Icon/IconButton'

const Step3 = (props) => {

    const [load, setLoad] = useState(true)

    const [minhasListas, setMinhasListas] = useState([])

    const [idLista, setIdLista] = useState([])

    useEffect(() => {

        api.get('contactLists').then( response => {

            setMinhasListas( response.data.docs )
            console.log( response.data.docs )
        })

    }, [])

    useEffect(() => {
        
        var listasGeral = []

        idLista.map((row) => {
            listasGeral.push( row._id )
        })

        props.handleOnChange( 'id_lista', listasGeral )

    }, [idLista])

    async function handleAddList( e )
    {

        const id = e.target.value

        if ( id !== 'all' ){

            const lista = minhasListas.filter( obj => 
                obj._id === id
            )[0]
            
            var listas = []
            idLista.map((row) => {
                listas.push(row)
            })
            listas.push( lista )
            setIdLista(listas)

            const removeLista = minhasListas.filter( obj => 
                obj._id !== id
            )

            setMinhasListas( removeLista )

        }

    }

    function handleRemoveList( id )
    {

        const lista = idLista.filter( obj => 
            obj._id === id
        )[0]
        var listas = []
        minhasListas.map((row) => {
            listas.push(row)
        })
        listas.push( lista )
        setMinhasListas(listas)
        const removeLista = idLista.filter( obj => 
            obj._id !== id
        )
        setIdLista( removeLista )

    }

    async function handleOnSave(e)
    {

        e.preventDefault()
        props.setStep(4)
        
    }

    function callbackChangeName( id, name )
    {

        var listas = []
        
        idLista.map(row => {

            if ( row._id === id ){
                row.lista = name
            }

            listas.push(row)

        })

        setIdLista( listas )

    }

    function handleNewList( newList )
    {

        newList.contacts = 0
        minhasListas.push( newList )
        setMinhasListas([...minhasListas])

    }

    async function handleDelList( id )
    {

        const response = await api.delete('contactLists/'+id)

        const docs = idLista.filter( obj => 
            obj._id !== id
        )

        setIdLista([...docs])

    }

    return(
        <form className="step" onSubmit={handleOnSave} style={{display: props.step === 3 ? 'block' : 'none'}}>

            <h2>{props.nome}</h2>
            <p>Selecione as pessoas ou listas que serão impactadas pela campanha.</p>

            <div className="separator">

                <div className="input">

                    <label>
                        <select 
                            name="id_lista"
                            type="text" 
                            className="input-default"
                            onChange={(e) => handleAddList(e)}
                            value="all"
                        >
                            <option value="all">Minhas listas salvas</option>
                            { minhasListas.length > 0 && minhasListas.map((row, key) => 
                                <option key={key} value={row._id}>{row.lista}</option>
                            )}
                        </select>
                    </label>

                    <div className="lists-options">

                        <EditList callbackNewList={(e) => handleNewList(e)}>
                            <button type="button" className="button-zig secondary">
                                <IconButton icon="new"/>
                                 <span>Criar nova lista</span>
                            </button>
                        </EditList>
                        

                    </div>

                    <div className="buttons">

                        { props.step !== 5 && <button>Próximo passo</button>}
                        { props.step !== 1 && <button onClick={() => props.setStep( (props.step - 1) )} type="button">Passo anterior</button>}
                        
                    </div>
                </div>

                <div className="list">
                    
                    { idLista && idLista.map((row, key) => 
                        <div key={key}>

                            <button onClick={() => handleRemoveList(row._id)} type="button" style={{marginLeft: '10px'}} className="button-zig danger">
                                <IconButton icon="min"/>
                            </button>

                            <div>
                                <EditList id={row._id} callbackChangeName={callbackChangeName}>
                                    <span>{row.lista}</span><br/>
                                </EditList>
                            </div>

                            <b title="Quantidade de contatos." className="contacts">{row.contacts}</b>

                            <EditList id={row._id} callbackChangeName={callbackChangeName}>
                                <button type="button" className="button-zig secondary">
                                    <IconButton icon="edit"/>
                                    <span>Editar</span>
                                </button>
                            </EditList>

                            <button onClick={() => messageStore.addConfirm('Tem certeza que deseja apagar a lista "'+row.lista+'"?', () => handleDelList(row._id))} type="button" style={{marginLeft: '10px'}} className="button-zig danger">
                                <IconButton icon="del"/>
                                <span>Apagar</span>
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </form>
    )

}

export default Step3