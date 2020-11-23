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

export default function Analytics(props){

    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])

    const history = useHistory()

    useEffect(() => {

        setTimeout(function(){
            setLoad( false )
        }, 3000)

    }, [props])
    
    return(
        
        <div id="analytics" className="page">

            <div className="h1-button">

                <H1Page nome={"Analytics"}/>
                
            </div>

            <table className="table-default">

                <thead>
                    <tr>
                        <th width="200">Campanha</th>
                        <th>Template</th>
                        <th>Mensagem</th>
                        <th>Operadora</th>
                        <th>Tipo</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    { load === true && 
                        [0,1,2,3,4,5,6,7].map((row, key) => 
                            <tr key={key}>
                                <td colSpan={6}><Skeleton/></td>
                            </tr>
                        )
                    }
                    { load === false && [{},{},{},{},{},{},{},{}].map((row, key) => 
                        <tr key={key}>
                            <td>
                                Campanha nome
                            </td>
                            <td width="50">
                                <PreviewTemplate id="5faf5e37ac3b660022a1c331"/>
                            </td>
                            <td>
                                Mensagem da campanha
                            </td>
                            <td>
                                TIM
                            </td>
                            <td>
                                SMS
                            </td>
                            <td>
                                10/10/2020 10:20
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>

    )

}