import React, { useEffect, useState } from 'react'

//scss
import './NovaCampanha.scss'
import H1Page from '../../Components/Layout/H1Page'
import Step1 from '../../Components/CampgainCreation/Step1'
import Step2 from '../../Components/CampgainCreation/Step2'
import Step3 from '../../Components/CampgainCreation/Step3'
import Step4 from '../../Components/CampgainCreation/Step4'
import Step5 from '../../Components/CampgainCreation/Step5'
import messageStore from '../../Store/MessageStore'
import IconButton from '../../Components/Icon/IconButton'
import { api } from '../../Api/app'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Layout(props) {

    const history = useHistory()

    const [step, setStep] = useState(1)
    const [send, setSend] = useState('')

    const steps = [
        {
            num: 1,
            nome: 'Nome da campanha',
            Component: Step1,
        },
        {
            num: 2,
            nome: 'Customização',
            Component: Step2,
        },
        {
            num: 3,
            nome: 'Público',
            Component: Step3,
        },
        {
            num: 4,
            nome: 'Configuração',
            Component: Step4,
        },
        {
            num: 5,
            nome: 'Publicação',
            Component: Step5,
        },
    ]

    const [fields, setFields] = useState(
        {
            nome: '',
            id_template: '',
            id_lista: '',
            mensagem: '',
            periodo_inicial: '',
            periodo_final: '',
        }
    )


    useEffect(() => {
        
        if ( props.location.state )
        {

            const stateRedirect = props.location.state

            setFields( {...stateRedirect.fields} )
            setSend( stateRedirect.send )
            setStep( stateRedirect.step )

        }

    }, [props])

    function handleOnChange(name, value)
    {

        const data = fields
              data[name] = value

        setFields( data )

    }

    async function handleOnSave()
    {

        try {
            
            fields.send = send

            if ( !fields.nome ) {
                setStep(1)
                throw "Nome da campanha é obrigatório."
            }

            if ( fields.id_lista.length === 0 ) {
                setStep(3)
                throw "Selecione ao menos uma lista de contatos."
            }

            if ( !fields.periodo_inicial ) {
                setStep(5)
                throw "Preencha um periodo inicial."
            }

            if ( !fields.periodo_final ) {
                setStep(5)
                throw "Preencha um periodo final."
            }

            const response = await api.post('campaigns', {
                templateId: fields.id_template,
                contactListId: fields.id_lista,
                nome: fields.nome,
                mensagem: fields.mensagem,
                send: send,
                periodoInicial: fields.periodo_inicial,
                periodoFinal: fields.periodo_final,
                envioInicial: fields.periodo_inicial,
                envioFinal: fields.periodo_final,
            })

            if ( response.data.error === true ) throw response.data.message

            messageStore.addSuccess('Campanha salva com sucesso.')
            history.push('/campanhas')

        } catch ( e ) {

            messageStore.addError(e)

        }
        

    }

    return(

        <>

        { !send &&
            <div className="modal-send-phone">

                <div className="modal">
                    
                    <h2>Por qual método você deseja enviar?</h2>

                    <div className="send-campgain-type">

                        <div className="phone sms" onClick={() => setSend('sms')}>
                            <button>SMS</button>
                        </div>

                        <div className="phone flashsms" onClick={() => setSend('flashsms')}>
                            <button>FlashSMS</button>
                        </div>

                        <div className="phone whatsapp" onClick={() => setSend('whatsapp')}>
                            <button>WhatsApp</button>
                        </div>

                    </div>
                </div>

            </div>
        }

        <div id="novaCampanha" className="page">

            <H1Page nome="Criar nova campanha"/>


            <div className="steps">
                
                <button type="button" className="button-zig neutral" onClick={() => setSend('')}>
                    <IconButton icon={send}/>
                    <span>{send}</span>
                </button>

                { steps.map((row, key) =>
                    <button key={key} className={step === row.num ? 'step-bt active' : 'step-bt no-active'} onClick={() => setStep( row.num )}>
                        <b>Passo 0{row.num}</b>
                        <span>{row.nome}</span>
                    </button>
                )}
            </div>

            { steps.map((row, key) =>
                <row.Component 
                    key={key}
                    step={step}
                    setStep={setStep}
                    fields={fields}
                    send={send}
                    handleOnSave={handleOnSave}
                    handleOnChange={handleOnChange}
                    {...row}
                />
            )}

        </div>
        </>

    )

}