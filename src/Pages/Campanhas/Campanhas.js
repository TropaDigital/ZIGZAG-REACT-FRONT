import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import br from 'date-fns/locale/pt-BR';

//scss
import './Campanhas.scss'

export default function Campanhas(props) {

    //filtros
    const [dataInicial] = useState('')
    const [dataFinal] =  useState('')

    //accordion
    const [accordion, setAccordion] = useState(0)

    //campanhas
    const data = [{},{},{},{},{}]

    return(
        <div className="page">

            <h1>Minhas Campanhas</h1>
            
            <p>Filtrar por:</p>
            <div className="filter">

                <label className="date">
                    <DatePicker
                        selected={dataInicial}
                        startDate={dataInicial}
                        endDate={dataFinal}
                        locale={br}
                        dateFormat="dd/MM/Y"
                        placeholderText="Data Inicial"
                    />
                    <i></i>
                </label>

                <label className="date">
                    <DatePicker
                        selected={dataFinal}
                        selectsEnd
                        startDate={dataInicial}
                        endDate={dataFinal}
                        minDate={dataInicial}
                        locale={br}
                        dateFormat="dd/MM/Y"
                        placeholderText="Data Final"
                    />
                    <i></i>
                </label>

                <label>
                    <select>
                        <option>Tipo de Envio</option>
                    </select>
                </label>

                <label>
                    <select>
                        <option>Status</option>
                    </select>
                </label>

                <label>
                    <input placeholder="Buscar por nome" />
                </label>

                <button className="btn">Filtrar</button>

            </div>

            <div className="accordion">
                
                {data.map((e, i) => (
                <div key={i} className={`item ${accordion === i ? 'active' : null}`}>
                    
                    <div className="title" onClick={() => setAccordion(i)}>Nome da Campanha 0{i+1}</div>

                    <div className="content row">
                        <div className="col">
                            <p>Período da Campanha</p>
                            <small>28/10/2019 a 28/03/2020</small>
                        </div>

                        <div className="col">
                            <p>Link do Template</p>
                            <small>Meu Template 001</small>
                        </div>
                        
                        <div className="col">
                            <p>Método</p>
                            <small>Enviar Agora</small>
                        </div>
                        
                        <div className="col">
                            <p>Status</p>
                            <small>Enviado</small>
                        </div>

                        <button class="btn">Ver Relatórios</button>

                    </div>

                </div>
                ))}

            </div>

        </div>
    )

}