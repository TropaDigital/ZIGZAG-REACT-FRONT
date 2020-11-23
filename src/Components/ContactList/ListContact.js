import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import { useHistory } from 'react-router-dom'
import { api } from '../../Api/app'
import messageStore from '../../Store/MessageStore'
import IconButton from '../Icon/IconButton'

import "./ContactList.scss"

export default function ListContact(props)
{

    const [open, setOpen] = useState(props.open ? props.open : false)

    useEffect(() => {

    }, [open])

    async function handleDelContact(id)
    {

        var del = await api.delete('contacts/'+id)

        console.log( del )

        props.handleDelContact(id)

    }

    function handleEdit( contact )
    {

        props.setTab('edit')
        props.setContact(contact)
        
    }

    return(

        <>

            <table className="table-default">

                <thead>
                    <tr>
                        <th width="10"></th>
                        <th width="10"></th>
                        { props.load === false && props.columns.map((row, key) =>
                            <th>
                                {row}
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>

                    { props.load === true &&
                    <tr>
                        <td colSpan={props.columns.length}>
                            <Skeleton/>
                        </td>
                    </tr>
                    }

                    { props.load === false && props.contacts.docs.length == 0 &&
                        <tr>
                            <td colSpan={props.columns.length + 2}>Nenhum contato encontrado.</td>
                        </tr>
                    }

                    { props.load === false && props.contacts.docs.map((row, key) =>
                    <tr key={key}>
                        <td>
                            <button type="button" className="button-zig danger" onClick={() => messageStore.addConfirm('Deseja realmente remover esse contato?', () => handleDelContact(row._id))}>
                                <IconButton icon="del"/>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="button-zig primary" onClick={() => handleEdit(row)}>
                                <IconButton icon="edit"/>
                            </button>
                        </td>
                        {props.columns.map((coluna, indice) =>
                            <td>
                                {row['field'+(indice + 1)]}
                            </td>
                        )}
                    </tr>
                    )}

                </tbody>

            </table>

        </>

    )

}