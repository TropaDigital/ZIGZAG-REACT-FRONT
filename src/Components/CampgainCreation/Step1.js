import React, { useEffect } from 'react'

const Step1 = (props) => {

    useEffect(() => {
        
    }, [])


    async function handleOnSave(e)
    {

        e.preventDefault()
        props.setStep(2)
        
    }

    return(
        <form className="step" onSubmit={handleOnSave} style={{display: props.step === 1 ? 'block' : 'none'}}>

            <h2>{props.nome}</h2>
            <p>Para iniciar a criação uma nova campanha ou escolha uma já existente.</p>

            <div className="separator">

                <div className="input">

                    <label>
                        <input 
                            name="nome"
                            onChange={(e) => props.handleOnChange( 'nome', e.target.value )}
                            type="text" 
                            className="input-default" 
                            placeholder="Nome da Campanha"
                            defaultValue={props.fields.nome}
                        />
                    </label>

                    <div className="buttons">
                        { props.step !== 5 && <button>Próximo passo</button>}
                        { props.step !== 1 && <button onClick={() => props.setStep( (props.step - 1) )} type="button">Passo anterior</button>}
                    </div>

                </div>
            </div>


        </form>
    )

}

export default Step1