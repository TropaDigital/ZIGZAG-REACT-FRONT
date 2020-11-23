import React, { useEffect, useState } from 'react'
import { api } from '../../Api/app'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import messageStore from '../../Store/MessageStore'
import PreviewTemplate from '../../Components/TemplateCreation/PreviewTemplate/PreviewTemplate'
import H1Page from '../../Components/Layout/H1Page'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import IconButton from '../../Components/Icon/IconButton'
import datesFormater from '../../Helper/DatesFormater'

export default function Index(props){

    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])

    const history = useHistory()
    

    useEffect(() => {

        getData()

    }, [props])

    async function getData()
    {

        setLoad(true)
        var response = await api.get('templates')

        console.log( response )
        setData(...[response.data.docs])
        setLoad( false )

    }
    
    async function handleNew()
    {

        setLoad(true)
        var response = await api.post('templates', {
            nome: 'Novo template',
            estrutura: '[{}]'
        })

        if ( response.data.error === true ){
            messageStore.addError(response.data.message)
        } else {
            history.push('/templates/create/'+response.data.result._id)
        }
        
        setLoad(false)

    }

    async function handleDelete(id)
    {

        setLoad(true)
        await api.delete('templates/'+id)
        getData()
        setLoad(false)

    }

    return(
        
        <div className="page">

            <div className="h1-button">

                <H1Page nome={"Meus templates"}/>

                <div className="buttons">
                    <button onClick={handleNew} className="button-zig primary">
                        <IconButton icon="new"/>
                        <span>Criar novo template</span>
                    </button>
                </div>
                
            </div>

            <table className="table-default">

                <thead>
                    <tr>
                        <th colSpan={4}>
                            Nome do template
                        </th>
                    </tr>
                </thead>

                <tbody>
                    { load === true && 
                        [0,1,2].map((row, key) => 
                            <tr colSpan={4} key={key}>
                                <td><Skeleton/></td>
                            </tr>
                        )
                    }
                    { load === false && data.map((row, key) => 
                        <tr key={key}>
                            <td width="100%">
                                <b>{row.nome}</b><br/>
                                <span>Criado em {datesFormater.dateBR(row.createdAt)}</span><br/>
                                <span>Por <b>{row.user.nome}</b></span>
                            </td>
                            <td>
                                <a className="button-zig primary" onClick={() => history.push("/templates/create/"+row._id)}>
                                    <IconButton icon="edit"/>
                                    <span>Editar</span>
                                </a>
                            </td>
                            <td>
                                <PreviewTemplate nome={row.nome} id={row._id}>
                                    <a className="button-zig secondary">
                                        <IconButton icon="view"/>
                                        <span>Visualizar</span>
                                    </a>
                                </PreviewTemplate>
                            </td>
                            <td>
                                <a className="button-zig danger" onClick={() => messageStore.addConfirm('Deseja remover o template "'+row.nome+'"', () => handleDelete(row._id))}>
                                    <IconButton icon="del"/>
                                    <span>Remover</span>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>

    )

}