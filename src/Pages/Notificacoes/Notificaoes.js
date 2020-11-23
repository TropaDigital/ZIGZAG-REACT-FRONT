import React, { useEffect, useState } from 'react'

//scss
import './Notificacoes.scss'
import H1Page from '../../Components/Layout/H1Page';
import { api } from '../../Api/app';
import datesFormater from '../../Helper/DatesFormater';
import IconButton from '../../Components/Icon/IconButton';

export default function Notificacoes(props) {

    const [data, setData] = useState({
        docs: []
    })

    useEffect(() => {

        api.get('logs').then( response => {

            console.log( response.data.docs )
            setData({...response.data})

        })

        console.log( props )

    }, [props])

    function handleRead( id )
    {

        data.docs = data.docs.filter( obj => 
            obj._id !== id
        )

        data.total = data.total - 1

        document.querySelector('#total-notification').innerHTML = data.total

        setData({...data})

        api.post('logs/'+id).then( reponse => {

            console.log( reponse )

        })

    }

    return(
        <div id="notificacoes" className="page">

            <H1Page nome="Notificações"/>

            <div className="list-notificacations">

                { data.docs.map((row, key) =>
                <div className="notification" key={key}>

                    <div className="funcoes">
                        <button onClick={() => handleRead(row._id)} type="button" className="button-zig danger">
                            <IconButton icon="del"/>
                            <span>Arquivar</span>
                        </button>
                    </div>

                    <div className="not-text">
                        <div className="img" style={{backgroundImage: 'url('+row.usuario.foto+')'}}></div>
                        <div className="text">

                            <div className="not">
                                <b>{row.usuario.nome}</b> {row.mensagem}
                            </div>
                            <div className="date">{ datesFormater.dateBR( row.createdAt ) }</div>
                        </div>
                    </div>

                </div>
                )}

            </div>

        </div>
    )

}