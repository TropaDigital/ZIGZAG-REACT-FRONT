import React, { useEffect, useState } from 'react'
import { api } from '../../Api/app'
import InputMask from 'react-input-mask'

const Step5 = (props) => {

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
        
        props.handleOnSave()
        
    }



    return(
        <form className="step" onSubmit={handleOnSave} style={{display: props.step === 5 ? 'block' : 'none'}}>

            <h2>{props.nome}</h2>
            <p>Selecione o periodo que sua campanha vai estar ativa.</p>

            <div className="separator">

                <div className="input">

                    <label>
                        <InputMask 
                            mask="99/99/9999 99:99" 
                            placeholder="Periodo inicial"
                            onChange={(e) => props.handleOnChange( 'periodo_inicial', e.target.value )}
                            type="text" 
                            className="input-default" 
                        />
                    </label>

                    <label>
                        <InputMask 
                            mask="99/99/9999 99:99" 
                            placeholder="Periodo final"
                            onChange={(e) => props.handleOnChange( 'periodo_final', e.target.value )}
                            type="text" 
                            className="input-default" 
                        />
                        
                    </label>

                    <div className="buttons">

                        <button>Concluir</button>
                        { props.step !== 1 && <button onClick={() => props.setStep( (props.step - 1) )} type="button">Passo anterior</button>}
                        
                    </div>
                </div>

            </div>

        </form>
    )

}

export default Step5