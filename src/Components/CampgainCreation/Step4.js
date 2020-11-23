import React, { useEffect, useState } from 'react'
import { api } from '../../Api/app'
import EditList from '../ContactList/EditList'

const Step4 = (props) => {

    const [load, setLoad] = useState(true)

    const [message, setMessage] = useState('Mensagem')

    const [phones, setPhones] = useState([])

    useEffect(() => {

        props.handleOnChange( 'mensagem', message )

    }, [message])

    useEffect(() => {

        setMessage( props.fields.mensagem )

    }, [props])


    async function handleOnSave(e)
    {

        e.preventDefault()
        props.setStep(5)
        
    }

    return(
        <form className="step" onSubmit={handleOnSave} style={{display: props.step === 4 ? 'block' : 'none'}}>

            <h2>{props.nome}</h2>
            <p>Configure e escreva a mensagem que será enviada via {props.send}.</p>

            <div className="separator">

                <div className="input message-campgain">

                   <div className={"phone"}>

                        <div className={"display " + props.send}>
                            <div className="message">
                                <div className="sender">zigzag</div>
                                <div dangerouslySetInnerHTML={{ __html: message }}/>
                                { props.fields.id_template &&
                                    <span>https://zzbr.com/cod123</span>
                                }
                            </div>
                        </div>

                   </div>

                    <div className="buttons">

                        { props.step !== 5 && <button>Próximo passo</button>}
                        { props.step !== 1 && <button onClick={() => props.setStep( (props.step - 1) )} type="button">Passo anterior</button>}
                        
                    </div>
                </div>

                <div className="list message-campgain">

                    <p>Utilize os [shortcode] para personalizar suas mensagens.</p>

                    <label>
                        <textarea value={message} className="input-default" maxLength={160} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <span>{(160 - message.length)} caracteres restantes</span>
                    </label>

                    { props.fields.id_template &&
                    <label>
                        <b>Link automático da campanha</b>
                        <span>https://zzbr.com/cod123</span>
                    </label>
                    }

                    <label>

                        <b>Teste o  envio da campanha</b>

                        <div>
                            <input onChange={(e) => setPhones(e.target.value.split(','))} type="text" className="input-default" placeholder="Celulares separados por virgula"/>
                            <button type="button" onClick={() => alert('Indisponivel no momento.')}>Enviar  mensagem teste</button>
                        </div>

                        <div className="phones">
                            { phones.map((row, key) => 
                                <span className="phone-number">{row}</span>
                            )}
                        </div>

                    </label>

                </div>

            </div>

        </form>
    )

}

export default Step4