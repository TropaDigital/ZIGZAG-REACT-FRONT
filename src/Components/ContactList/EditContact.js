import React, {useState, useEffect} from 'react'
import { api } from '../../Api/app'
import messageStore from '../../Store/MessageStore'
import InputDefault from '../Form/InputDefault'
import FormDefault from '../Form/FormDefault'
import InputRow from '../Form/InputRow'
import IconButton from '../Icon/IconButton'

import "./ContactList.scss"

export default function EditContact(props)
{

    const [open, setOpen] = useState(props.open ? props.open : false)
    const [load, setLoad] = useState(true)
    const [columns, setColumns] = useState([])
    const [values, setValues] = useState({
        contactListId: props.list._id
    })

    useEffect(() => {

        setColumns([...props.columns])

        if ( props.contact ){
            console.log( props.contact )
            setValues( {...props.contact} )
        }

    }, [open])

    function handleNewColumn()
    {

        columns.push('Coluna '+(columns.length + 1))
        setColumns([...columns])

    }

    function handleDeleteColumn(name)
    {

        const list = columns.filter( obj => 
            obj !== name
        )

        console.log( list )

        setColumns([...list])

    }

    function handleChangeColumn(name, value)
    {

        const list = []

        columns.map(row => {

            if ( row == name ){
                list.push(value)
            } else {
                list.push(row)
            }

        })

        setColumns([...list])

        console.log( list )

    }

    async function handleNewContact()
    {

        try {

            var listEdit = await api.put('contactLists/'+props.list._id)

            if ( listEdit.data.error === true ) throw 'Houve um erro ao salvar, tente novamente mais tarde.'

            if ( props.contact ){

                var contactEdit = await api.put('contacts/'+props.contact._id, values)

                if ( contactEdit.data.error === true ) throw 'Houve um erro ao salvar, tente novamente mais tarde.'

                props.handleEditContact( columns, values )

            } else {

                var contactEdit = await api.post('contacts/', values)

                if ( contactEdit.data.error === true ) throw 'Houve um erro ao salvar, tente novamente mais tarde.'

                values._id = contactEdit.data.result._id
                
                props.handleNewContact( columns, values )

            }

            

            messageStore.addSuccess('Contato salvo com sucesso.')

        } catch (err) {

            console.log(err)
            //messageStore.addError(err)

            alert('Algo deu errado...')

        }

    }

    function handleOnChange(name, value)
    {

        values[name] = value
        setValues({...values})

    }

    return(

        <>

            <table className="table-default">

                <thead>
                    <tr>
                        <th width="10"></th>
                        <th>
                            Coluna
                        </th>
                        <th>
                            Valor
                        </th>
                    </tr>
                </thead>

                <tbody>

                {columns.map((coluna, indice) =>
                    <tr>

                        <th>
                            <button type="button" className="button-zig danger" onClick={() => handleDeleteColumn(coluna)}>
                                <IconButton icon="del"/>
                            </button>
                        </th>
                        <th>
                            <InputDefault readOnly={coluna === 'celular' ? 'true' : false} onChange={handleChangeColumn} name={coluna} value={coluna}/>
                        </th>
                        
                        <td>
                            <InputDefault onChange={handleOnChange} name={'field'+(indice + 1)} placeholder={coluna} value={values['field'+(indice + 1)]}/>
                        </td>
                    </tr>
                    )}
                
                </tbody>

                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <button type="button" className="button-zig secondary" style={{flexDirection: 'row'}} onClick={handleNewColumn}>
                                <IconButton icon="new"/>
                                <span style={{marginLeft: '10px'}}>Adicionar novo campo</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="button-zig primary" style={{flexDirection: 'row'}} onClick={handleNewContact}>
                                <IconButton icon="save"/>
                                <span style={{marginLeft: '10px'}}>Confirmar</span>
                            </button>
                        </td>
                    </tr>
                </tfoot>

            </table>
            
        </>

    )

}