import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import br from 'date-fns/locale/pt-BR';

//scss
import './Campanhas.scss'
import PreviewTemplate from '../../Components/TemplateCreation/PreviewTemplate/PreviewTemplate';
import H1Page from '../../Components/Layout/H1Page';
import { api } from '../../Api/app';
import datesFormater from '../../Helper/DatesFormater';

export default function Campanhas(props) {

    //filtros
    const [dataInicial] = useState('')
    const [dataFinal] =  useState('')

    //accordion
    const [accordion, setAccordion] = useState(0)

    //campanhas
    const [data, setData] = useState([])

    useEffect(() => {

        api.get('campaigns').then( response => {

            setData( response.data.docs )

        })

    }, [])

    return(
        <div id="campanhas" className="page">

            <H1Page nome="Minhas campanhas"/>
            
            <div className="accordion">
                
                {data.map((row, key) => (
                <div key={key} className={`item ${accordion >= key ? 'up' : 'down'} ${accordion === key ? 'active' : null}`}>
                    
                    <div className="title" onClick={() => setAccordion(key)}>
                        <span>{row.nome}</span>
                        <button>
                            { accordion === key ? '-' : '+' }
                        </button>
                    </div>
                    <div className="infos">

                        <div>
                            <b>Período da campanha</b>
                            <span>
                                <i className="fa fa-calendar"></i>
                                {datesFormater.dateBR(row.periodoInicial)} a {datesFormater.dateBR(row.periodoFinal)}
                            </span>
                        </div>

                        { row.templateId &&
                        <div>
                            <b>Link do template</b>
                            <PreviewTemplate id={row.templateId}>
                                <span className="link">
                                    <i class="fa fa-external-link" aria-hidden="true"></i> 
                                    Visualizar
                                </span>
                            </PreviewTemplate>
                        </div>
                        }

                        <div>
                            <b>Tipo</b>
                            <span>{row.send}</span>
                        </div>

                        <div>
                            <b>Relatório</b>
                            <span>Indisponivel</span>
                        </div>

                    </div>

                </div>
                ))}

            </div>

        </div>
    )

}