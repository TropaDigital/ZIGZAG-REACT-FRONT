import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../../Edition/FieldsetWidget'
import InputMask from 'react-input-mask'
import CurrencyInput from 'react-currency-masked-input'

import ToggleSwitch from '../../../../ToggleSwitch/ToggleSwitch'
import LabelColor from '../../../Edition/LabelColor'

const InputText = (props) => {

    const options = props.item.input
    const id = props.item.id

    const [value, setValue] = useState('')

    function handleChangeInput(e)
    {

        setValue(e.target.value)
        if ( props.onChange ) props.onChange(e)

    }

    return(

        <>

            { options.type === 'text' &&  
                <InputMask 
                    type="text"
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'tel' &&  
                <InputMask 
                    type="tel"
                    mask="(99) 9999-99999" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'email' &&  
                <InputMask 
                    type="email"
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'textarea' &&  
                <textarea 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'num' &&  
                <InputMask 
                    type="num"
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'date' &&  
                <InputMask 
                    mask="99/99/9999" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'hour' &&  
                <InputMask 
                    mask="99:99" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'money' &&  
                <CurrencyInput 
                    separator="," 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                />
            }

            { options.type === 'cpf' &&  
                <InputMask 
                    mask="999.999.999-99" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'cnpj' &&  
                <InputMask 
                    mask="99.999.999/9999-99" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

            { options.type === 'rg' &&  
                <InputMask 
                    mask="99.999.999-9" 
                    style={options.style} 
                    placeholder={options.placeholder}
                    name={options.name}
                    onChange={(e) => handleChangeInput(e)}
                    required={options.required}
                /> 
            }

        </> 

    )

}

const InputTextEdit = ({id, item, onSave, onDelete}) => {
    
    const [load, setLoad] = useState(false)

    const [edit, setEdit] = useState(false)

    const [required, setRequired] = useState(item.input.required)

    const [type, setType] = useState(item.input.type)

    const [color, setColor] = useState(item.input.style.color)

    useEffect(() => {

        setRequired(item.input.required)
        setType(item.input.type)
        setColor(item.input.style.color)

    }, [edit])
    
    function handleOnSave()
    {

        var data = item

            data.input.required = required
            data.input.type = type
            data.input.style = []
            data.input.style.color = color

        onSave(data)
        setEdit(false)

    }

    return(

        <>
            
            { edit === false ?

                <>
                    <div className="button-input">
                        <button type="button" className="edit" onClick={() => setEdit(true)}></button>
                        <button type="button" className="remove" onClick={() => onDelete(item.id)}></button>
                        <button type="button" className="move"></button>
                    </div>
                </>

                :
                <div className="form-edit-input-text">

                    <h4>{item.input.placeholder}</h4>

                    <div className="group">

                        <label className="required">
                            <span>Campo obrigatório</span>
                            <ToggleSwitch value={required} setValue={setRequired}/>
                        </label>

                    </div>

                    <div className="group list-radio">

                        <label className="required">
                            <input type="radio" name="type" value="text" checked={type === 'text' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Nome</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="tel" checked={type === 'tel' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Telefone</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="email" checked={type === 'email' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>E-mail</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="textarea" checked={type === 'textarea' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Texto livre</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="num" checked={type === 'num' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Apenas números</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="date" checked={type === 'date' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Data</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="hour" checked={type === 'hour' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Hora</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="money" checked={type === 'money' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>Moeda</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="cpf" checked={type === 'cpf' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>CPF</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="cnpj" checked={type === 'cnpj' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>CNPJ</span>
                        </label>

                        <label className="required">
                            <input type="radio" name="type" value="rg" checked={type === 'rg' ? true : false} onChange={(e) => setType(e.target.value)}/>
                            <span>RG</span>
                        </label>

                    </div>

                    <div className="group">
                        <FieldsetWidget>
                            <LabelColor name="color" color={color} value="Cor do Texto" onChange={(e) => setColor(e.target.value)}/>
                        </FieldsetWidget>
                    </div>
                
                    <div className="buttons-submit">
                        <button type="button" className="button-default" style={{backgroundColor: 'white', color: '#939fb2'}} onClick={() => setEdit(false)}>Cancelar</button>
                        <button type="button" className="button-default" onClick={handleOnSave}>Aplicar</button>
                    </div>

                </div>
            }
        </>

    )

}

export { InputText, InputTextEdit }