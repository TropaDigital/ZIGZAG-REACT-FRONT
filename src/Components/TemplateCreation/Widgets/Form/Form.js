import React, { useEffect, useState } from 'react'
import nextId from 'react-id-generator'
import { ReactSortable } from 'react-sortablejs'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'

import './Form.scss'
import { InputText, InputTextEdit } from './Fields/InputText'
import InputTitleEdit from './Fields/InputTitle'

const Form = (props) => {

    const options = props.item.options

    const styleOptions = {
        fontFamily: options.fontFamily,
    }

    return(

        <div className="form-widget">
            <form>

                { options.title &&  <h2 style={options.title.style}>{options.title.value}</h2>}
                
                { options.fields && options.fields.map((row, key) =>
                    <label key={key}>
                        <InputText edit={false} item={row} key={key}/>
                    </label>
                )}
                
                <div className="button-submit">
                    { options.button && <button style={options.button.style} type="button">{options.button.value}</button> }
                </div>
                
            </form>
        </div>

    )

}

const FormEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState(item.options)

    function handleOnChangeTitle(e)
    {

        var optionInput = options
            optionInput.title[e.target.name] = e.target.value

        setOptions(optionInput)

        onSave(options)

    }

    function handleChangeTitleStyle(e)
    {

        console.log(e)
        onSave(options)

    }

    function handleOnChangeField(e)
    {

        setLoad(true)

        let fieldsNew = []
        let optionNew = options

        options.fields.map((row) => {

            if ( row.id === e.id ){
                fieldsNew.push(e)
            } else {
                fieldsNew.push(row)
            }

        })

        optionNew.fields = fieldsNew
        setOptions(optionNew)
        onSave(options)

        setTimeout(function(){
            setLoad(false)
        }, 10)

        console.log('handleOnCHangeField')

    }

    function handleOnChangePlaceholder(e)
    {

        let fieldsNew = []
        let optionNew = options

        options.fields.map((row) => {

            console.log( row.id, e.target.id )
            if ( row.id == e.target.id ){
                row.input.placeholder = e.target.value
            }
     
            fieldsNew.push(row)

        })

        optionNew.fields = fieldsNew

        setOptions(optionNew)
        onSave(options)

        console.log('handleOnCHangeField')

    }

    function handleOnDeleteField(idField)
    {

        setLoad(true)

        var fields = options.fields.filter( obj => 
            obj.id !== idField
        )

        options.fields = fields
        setOptions(...[options])
        onSave(options)

        setTimeout(function(){
            setLoad(false)
        }, 10)

        console.log('handleOnDeleteField')

    }

    function handleMoveField(fields)
    {

        options.fields = fields
        setOptions(...[options])
        onSave(options)

    }

    function handleNewField()
    {

        setLoad(true)

        var newField = {
            id: nextId(),
            input: {
                type: 'text',
                required: false,
                placeholder: 'Nova mensagem',
                name: 'nova_mensagem',
                mask: '',
                style: {
                    color: '#333',
                },
            }
        }

        options.fields.push( newField )
        setOptions(...[options])
        onSave(options)

        setTimeout(function(){
            setLoad(false)
        }, 10)

        console.log('handleNewField')

    }

    function handleMoveFields()
    {

        setLoad(true)
        setTimeout(function(){
            setLoad(false)
        }, 0 )
        onSave(options)

    }

    return(

        <>
        { load === false && options && 
            <FormEditWidget onSave={onSave} item={options.fields}>
                
                <div className="group">
                    <FieldsetWidget className={'full-input'} legend="Titulo" full={true}>

                        <div className="input-edit">
                            <label>

                                <input type="text" onChange={(e) => handleOnChangeTitle(e)} name="value" defaultValue={options.title.value} />

                                <InputTitleEdit 
                                    edit={true} 
                                    item={options.title}
                                    onSave={(e) => handleChangeTitleStyle(e)}
                                />

                            </label>
                        </div>

                    </FieldsetWidget>
                </div>

                <div className="group">
                    <FieldsetWidget className={'full-input'} legend="Formulário" full={true}>

                        <ReactSortable 
                            dragoverBubble={true}
                            list={options.fields}
                            setList={(fields) => handleMoveField(fields)}
                            onUpdate={handleMoveFields}
                            className="input-edit"
                            animation={150}
                        >

                            { options.fields.map((row, key) => 
                                <label key={key}>
                                    <input type="text" onChange={(e) => handleOnChangePlaceholder(e)} id={row.id} name={row.input.name} defaultValue={row.input.placeholder} />
                                    <InputTextEdit 
                                        edit={true} 
                                        item={row}
                                        onSave={(e) => handleOnChangeField(e)}
                                        onDelete={(idField) => handleOnDeleteField(idField)}
                                    />
                                </label>
                            )}

                        </ReactSortable>

                        <button type="button" className="button-default-gray" onClick={handleNewField} style={{margin: '10px 0px -10px 0px'}}>
                            Adicionar item
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>

                    </FieldsetWidget>
                </div>
                

            </FormEditWidget>
        }
        </>

    )

}

export { Form, FormEdit } 