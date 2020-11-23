import React, { useState } from 'react'

//scss
import './Faq.scss'
import H1Page from '../../Components/Layout/H1Page';

export default function Faq(props) {

    //filtros
    const [dataInicial] = useState('')
    const [dataFinal] =  useState('')

    //accordion
    const [accordion, setAccordion] = useState(0)

    //campanhas
    const data = [
        {},{},{},{},{}
    ]

    return(
        <div id="faq" className="page">

            <H1Page nome="Ajuda"/>

            <div className="accordion">
                
                {data.map((row, key) => (
                <div key={key} className={`item ${accordion >= key ? 'up' : 'down'} ${accordion === key ? 'active' : null}`}>
                    
                    <div className="title" onClick={() => setAccordion(key)}>
                        <span>O que é o Sistema ZigZag SMS?</span>
                        <button>
                            { accordion === key ? '-' : '+' }
                        </button>
                    </div>
                    
                    <div className="infos">

                        <div>
                            <p>
                                O ZigZag SMS é o ambiente onde o cliente da ZigZagpode de forma autônoma realizar seus disparos de mensagens.<br/>
                                É a área dentro da plataforma que é responsável por gerenciar o relacionamento via mensagens com seus consumidores.<br/>
                                A ferramenta se preocupa em entender e atender aos canais que possuem essa facilidade: permite disparos de mensagens.
                            </p>

                            <p>
                                <b>Funcionalidades do ZigZag SMS</b>
                                Ao utilizar envios via SMS, você contará com as seguintes funcionalidades:<br/>
                                Campo livre para escrever mensagem;<br/>
                                Configuração de dados variáveis e relacionamento de colunas;<br/>
                                Envios por arquivo, sem variáveis, para até 10 mil contatos simultaneamente;<br/>
                                Múltiplos disparos, com variáveis, através de arquivos de até 50MB;
                            </p>

                            <p>
                                Painel de acompanhamento dos disparos com:<br/>
                                Acompanhamento de dados granulares;<br/>
                                Exportação de relatório de disparos;<br/>
                                Status e motivos de erros dos envios dentro do arquivo exportado.
                            </p>
                        </div>

                    </div>

                </div>
                ))}

            </div>

        </div>
    )

}