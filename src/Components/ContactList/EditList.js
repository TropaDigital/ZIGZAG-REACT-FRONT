import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import { useHistory } from 'react-router-dom'
import { api } from '../../Api/app'
import messageStore from '../../Store/MessageStore'

import "./ContactList.scss"
import EditContact from './EditContact'
import ListContact from './ListContact'

export default function EditList(props)
{

    const [open, setOpen] = useState(props.open ? props.open : false)
    const [load, setLoad] = useState(true)
    const [id, setId] = useState(props.id ? props.id : false)
    const [list, setList] = useState({})
    const [columns, setColumns] = useState([])
    const [contacts, setContacts] = useState([])
    const [nameList, setNameList] = useState('')
    const [tab, setTab] = useState('list')
    const [contact, setContact] = useState({})

    useEffect(() => {

        if ( id ){

            api.get('contactLists/'+id).then( response => {

                setList({...response.data})
                setNameList(response.data.lista)
                setColumns(response.data.colunas)
                setTab('list')

            })

            if ( open === true ){

                api.get('contacts?contactListId='+id).then( response => {

                    setContacts( response.data )
                    setLoad( false )
        
        
                })

            }

        }

    }, [open, id])

    function handleOpen()
    {

        setOpen(true)

    }

    function handleSaveName()
    {

        api.put('contactLists/'+list._id, {
            lista: nameList,
            colunas: columns
        }).then( response => {

            messageStore.addSuccess('Nome alterado com sucesso.')
            props.callbackChangeName( list._id, nameList )

        }).catch(e => {

            messageStore.addError('Não foi possivel alterar o nome.')

        })

    }

    function handleNewList()
    {
        
        api.post('contactLists', {
            lista: nameList,
            colunas: ['celular','nome']
        }).then( response => {

            if ( response.data.error === true ){
                messageStore.addError(response.data.message)
            } else {

                messageStore.addSuccess('Lista salva.')
                props.callbackNewList(response.data.result)
                setOpen(false)
                setNameList('')

            }
            

        }).catch( e => {

            messageStore.addError('Não foi possivel criar a lista.')

        })

    }

    function handleClose()
    {

        if ( open === true ){

            var element = document.getElementById("contact-list")
                element.classList.add("closed")

            setTimeout(function(){
                setOpen(false)
            }, 900)

        }

    }

    function handleEditContact( col, val )
    {

        setColumns([...col])

        console.log( val )
        
        var contactsList = []

        contacts.docs.map(row => {

            if ( row._id === val._id ){
                contactsList.push(val)
            } else {
                contactsList.push(row)
            }
            
        })

        contacts.docs = contactsList
        setContacts(contacts)

    }

    function handleNewContact( col, val )
    {

        setColumns([...col])
        contacts.docs.push(val)
        setContacts(contacts)
        list.contacts = list.contacts + 1
        setList(list)

    }

    function handleDelContact( id )
    {

        const docs = contacts.docs.filter( obj => 
            obj._id !== id
        )

        contacts.docs = docs
        setContacts({...contacts})
        list.contacts = list.contacts - 1
        setList(list)

    }

    return(

        <>

            <div type="button" className="button-edit-list" onClick={() => open === true ? handleClose(false) : handleOpen(false)}>
                {props.children ? props.children : <button type="button" className="button-zig secondary">Editar</button>}
            </div>

            { open === true &&
                <div id="contact-list" className="modal-contact">

                    <button type="button" className="bg-close" onClick={() => open === true ? handleClose(false) : handleOpen(false)}></button>

                    <div className="modal" id="contact-list-modal">

                        <div className="head">
                            <input className="input-default" placeholder="Nome da lista" defaultValue={nameList} onChange={(e) => setNameList(e.target.value)}/>
                            <button type="button" onClick={list._id ? handleSaveName : handleNewList}>{list._id ? 'Salvar nome' : 'Salvar'}</button>
                        </div>

                        { id &&
                        <>

                            <div className="button">

                                <button type="button" onClick={() => setTab('list')} className={tab === 'list' ? 'button-zig primary' : 'button-zig neutral'}>Contatos ({list.contacts})</button>

                                <button type="button" onClick={() => setTab('add')} className={tab === 'add' ? 'button-zig primary' : 'button-zig neutral'}>Adicionar contatos avulsos</button>

                                <button type="button" style={{display:'none'}} onClick={() => setTab('import')} className={tab === 'import' ? 'button-zig primary' : 'button-zig neutral'}>Importar contatos</button>

                            </div>

                            <div className="content">

                                { tab === 'list' &&
                                    <ListContact
                                        list={list}
                                        load={load}
                                        contacts={contacts}
                                        columns={columns}
                                        handleDelContact={handleDelContact}
                                        setTab={setTab}
                                        setContact={setContact}
                                    />
                                }

                                { tab === 'add' &&
                                    <EditContact
                                        list={list}
                                        nameList={nameList}
                                        columns={columns}
                                        handleNewContact={handleNewContact}
                                    />
                                }

                                { tab === 'edit' &&
                                    <EditContact
                                        list={list}
                                        nameList={nameList}
                                        columns={columns}
                                        contact={contact}
                                        handleEditContact={handleEditContact}
                                    />
                                }

                            </div>

                        </>
                        }

                    </div>

                </div>
            }
        </>

    )

}