import React, { useEffect, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import PreviewTemplate from '../TemplateCreation/PreviewTemplate/PreviewTemplate'
import { api } from '../../Api/app'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import messageStore from '../../Store/MessageStore'
import IconButton from '../Icon/IconButton'

const Step2 = (props) => {

    const history = useHistory()

    const [template, setTemplate] = useState(0)

    const [listTemplates, setListTemplate] = useState([])

    const [load, setLoad] = useState(true)

    useEffect(() => {
        
        if ( template === 0 ){
            getTemplateList('templates')
        } else if ( template === 1 ) {
            getTemplateList('templates')
        } else if ( template === 2 ){
            setListTemplate([])
        }

        props.handleOnChange( 'id_template', '' )

    }, [template])

    async function getTemplateList( resource )
    {

        setLoad( true )

        const response = await api.get( resource )

        //console.log( response.data.docs )

        setListTemplate( response.data.docs )

        setLoad( false )

    }

    async function handleOnSave(e)
    {

        e.preventDefault()
        props.setStep(3)
        
    }

    async function handleNewTemplate()
    {


        setLoad(true)
        var response = await api.post('templates', {
            nome: props.fields.nome,
            estrutura: '[{}]'
        })

        if ( response.data.error === true ){
            messageStore.addError(response.data.message)
        } else {
            history.push({
                pathname: '/templates/create/'+response.data.result._id,
                state: {
                    fields: props.fields,
                    send: props.send,
                    step: props.step,
                }
            })
        }
        
        setLoad(false)

    }

    return(
        <form className="step" onSubmit={handleOnSave} style={{display: props.step === 2 ? 'block' : 'none'}}>

            <h2>{props.nome}</h2>
            <p>Escolha um template para sua campanha ou crie um novo.</p>

            <div className="separator">

                <div className="input">

                    <div style={{padding: '0px 0px 30px 0px'}}>
                        <label onClick={() => setTemplate(0)}>
                            <ToggleSwitch value={template ==  0 ? 1 : false}/>
                            <span>Meus templates</span>
                        </label>

                        <label onClick={() => setTemplate(1)}>
                            <ToggleSwitch value={template ===  1 ? 1 : false}/>
                            <span>Templates zigzag</span>
                        </label>

                        <label onClick={() => setTemplate(2)}>
                            <ToggleSwitch value={template ===  2 ? 1 : false}/>
                            <span>Não quero usar template</span>
                        </label>

                        <label>
                            <button onClick={handleNewTemplate} type="button" className="button-zig secondary">
                                <IconButton icon="new"/>
                                <span>Criar template</span>
                            </button>
                        </label>

                    </div>

                    <label style={{display: 'none'}}>
                        <input 
                            name="template"
                            type="text" 
                            className="input-default" 
                            placeholder="Buscar por nome"
                        />
                    </label>

                    <div className="buttons">

                        { props.step !== 5 && <button>Próximo passo</button>}
                        { props.step !== 1 && <button onClick={() => props.setStep( (props.step - 1) )} type="button">Passo anterior</button>}
                        
                    </div>
                </div>

                <div className="list">

                    { load === true && <div>Carregando</div> }
                    
                    { load === false && listTemplates.map((row, key) => 
                        <div key={key}>

                            <label>
                                <input defaultChecked={ props.fields.id_template === row._id ? true : false } onClick={() => props.handleOnChange( 'id_template', row._id )} type="radio" name="id_template" value={row._id}/>
                                <span>{row.nome}</span>
                            </label>

                            <PreviewTemplate 
                                propsRedirect={
                                    {
                                        fields: props.fields,
                                        send: props.send,
                                        step: props.step,
                                    }
                                }
                                id={row._id} 
                                nome={row.nome}
                            />
                        </div>
                    )}
           
                </div>

            </div>

        </form>
    )

}

export default Step2