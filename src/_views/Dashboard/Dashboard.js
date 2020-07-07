import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from 'recharts'
import HorizontalScroll from 'react-scroll-horizontal'
import Skeleton from 'react-loading-skeleton'
import DatePicker from 'react-datepicker'
import br from 'date-fns/locale/pt-BR';
import { getDates, getDatesPeriodo, formatarNumero, getDaysDates } from '../../_api/helper'

//scss
import './Dashboard.scss'
import 'react-datepicker/dist/react-datepicker.css'
//icos
import IconPhone from '../../__images/icos/icon_phone.png'
import IconRocket from '../../__images/icos/icon_rocket.png'
import IconDollar from '../../__images/icos/icon_dollar.png'
import IconStar from '../../__images/icos/icon_star.png'
//components
import ButtonDashIcon from '../../_components/ButtonDashIcon/ButtonDashIcon'
import ToggleSwitch from '../../_components/ToggleSwitch/ToggleSwitch'
import DateDashMonth from '../../_components/DateDashMonth/DateDashMonth'

export default function Dashboard(props) {

    //tamanho do grafico
    const [widthGraph, setWidthGraph] = useState(0)

    //loading
    const [loading, setLoading] = useState(true)

    //toggles de relatorios
    const [sms, setSms] = useState(1)
    const [flashSms, setFlashSms] = useState(1)
    const [whatsapp, setWhatsapp] = useState(1)

    //filtros e dias
    const [mesesFiltro, setMesesFiltro] = useState([])
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] =  useState('')

    //resultado da api
    const [data, setData] = useState([])

    //totais
    const [envios, setEnvios] = useState(0)
    const [enviosSms, setEnviosSms] = useState(0)
    const [enviosFlashSms, setEnviosFlashSms] = useState(0)
    const [enviosWhatsApp, setEnviosWhatsApp] = useState(0)
    const [ativas, setAtivas] = useState(0)
    const [creditosUsados, setCreditosUsados] = useState(0)
    const [visualizacoes, setVisualizacoes] = useState(0)

    useEffect(() => {
        
        setWidthGraph(document.getElementById("graph-width").offsetWidth)
        setDatesDefault()

    }, [])

    async function setDatesDefault(){

        //dias padrao
        var diasFiltro = 30

        var dateInicio = getDatesPeriodo(diasFiltro)
        var dateFinal = getDatesPeriodo(0)

        var filtro = []
            filtro['inicio'] = dateInicio
            filtro['final'] = dateFinal

        //setar datas
        setDates( filtro['inicio'], filtro['final'] )

    }

    function handleFilter(){

        var dataInicio = new Date(dataInicial)
            if ( !props.match.params.dataInicio )
                dataInicio.setDate(dataInicio.getDate() - 1)
        
        var dataFim = new Date(dataFinal)
            if  ( !props.match.params.dataFinal )
            dataFim.setDate(dataFim.getDate() - 1)
        
        setDates( dataInicio, dataFim )

        // history.push('/'+ getDateFormat(dataInicio)+'/'+getDateFormat(dataFim))

    }

    async function setDates(inicio, final){

        var dateInicio = new Date(inicio)
        var dateFinal = new Date(final)

        //quantidade de dias entre as duas datas
        var dias = getDaysDates(dateFinal, dateInicio)
        //tras os dias
        var dates = getDates(dias, inicio, new Date())
        //seta os dias dos periodos
        setMesesFiltro( dates )

        //seta periodo inicial
        var dataInicio = new Date(inicio)
            dataInicio.setDate(dataInicio.getDate() + 1)
        setDataInicial( dataInicio )

        //seta periodo final
        var dataFinal = new Date(final)
            dataFinal.setDate(dataFinal.getDate() + 1)
        setDataFinal( dataFinal )
        //pegar dados de acordo com as datas
        getDados( dates )

        //coloca o scroll dos dias todo para direta
        // setTimeout(function(){
        //     var scrollingDates = document.getElementsByClassName('scrolling-dates')[0]
        //     var distanciaLeft = dias * 55 + 55 - scrollingDates.offsetWidth
        //     scrollingDates.getElementsByTagName('div')[0].style.transform = 'translate3d(-'+distanciaLeft+'px, 0px, 0px)'
        // }, 600)

    }

    function getDados( dates ) {

        setLoading(true)

        setTimeout(function(){
            setLoading(false)
        }, 2000 )

        //totais definidos
        var totalSms = 0
        var totalFlashSms = 0
        var totalWhatsApp = 0

        //simulacao backend
        var response = []
        dates.map(row => {

            var sms = Math.floor(Math.random() * 9999);
            var flashSms = Math.floor(Math.random() * 9999);
            var whatsApp = Math.floor(Math.random() * 9999);

            response.push({
                "name": row.dia+' '+row.mesNome,
                "sms": sms,
                "flashsms": flashSms,
                "whatsapp": whatsApp,
            })

            return true

        })
        //fim da simulacao

        response.map(row => {

            totalSms = totalSms + row.sms
            totalFlashSms = totalFlashSms + row.flashsms
            totalWhatsApp = totalWhatsApp + row.whatsapp

            return true

        })

        setAtivas(23)
        setEnvios( formatarNumero(totalSms + totalFlashSms + totalWhatsApp) )
        setCreditosUsados(formatarNumero(66))
        setVisualizacoes(formatarNumero(6200))
        setEnviosSms(formatarNumero(totalSms))
        setEnviosFlashSms(formatarNumero(totalFlashSms))
        setEnviosWhatsApp(formatarNumero(totalWhatsApp))
        setData( response )

    }

    return(

        <div id="dashboard" className="page">

            <h1>Dashboard</h1>
            
            <div className="list-reports">

                <ButtonDashIcon to="/" icon={IconPhone} width="23.5%" title="Ativas" 
                    description={loading ? <Skeleton count={1} /> : ativas}
                />
                <ButtonDashIcon to="/" icon={IconRocket} width="23.5%" title="Enviadas" 
                    description={loading ? <Skeleton count={1} /> : envios}
                />
                <ButtonDashIcon to="/" icon={IconDollar} width="23.5%" title="Créditos Usados" 
                    description={loading ? <Skeleton count={1} /> : creditosUsados}
                />
                <ButtonDashIcon to="/" icon={IconStar} width="23.5%" title="Visualizações" 
                    description={loading ? <Skeleton count={1} /> : visualizacoes}
                />

            </div>

            <div className="reports-graph">

                <div className="filter">

                    <div className="date">
                        <p>Filtrar por período</p>

                        <div>
                            <label>
                                <DatePicker
                                    selected={dataInicial}
                                    onChange={date => setDataInicial(date)}
                                    startDate={dataInicial}
                                    endDate={dataFinal}
                                    locale={br}
                                    dateFormat="dd/MM/Y"
                                />
                                <i></i>
                            </label>

                            <label>
                                <DatePicker
                                    selected={dataFinal}
                                    onChange={date => setDataFinal(date)}
                                    selectsEnd
                                    startDate={dataInicial}
                                    endDate={dataFinal}
                                    minDate={dataInicial}
                                    locale={br}
                                    dateFormat="dd/MM/Y"
                                />
                                <i></i>
                            </label>
                            <button onClick={handleFilter}>Filtrar</button>
                        </div>

                    </div>

                    <div className="toggle">

                        <div>
                            <span>SMS</span>
                            <ToggleSwitch value={sms} setValue={setSms}/>
                        </div>

                        <div>
                            <span>Flash SMS</span>
                            <ToggleSwitch value={flashSms} setValue={setFlashSms}/>
                        </div>

                        <div>
                            <span>WhatsApp</span>
                            <ToggleSwitch value={whatsapp} setValue={setWhatsapp}/>
                        </div>

                    </div>

                </div>

                <div className="dates-dash-month">
                    <HorizontalScroll
                        pageLock={false}
                        reverseScroll={true}
                        className={loading ? "scrolling-dates transition" : "scrolling-dates"}
                        config={{
                            damping:10,
                            stiffness:100,
                        }}
                    >
                        {mesesFiltro.map((row, key) => (
                            <DateDashMonth key={key} active={row.active} day={row.dia} month={row.mesNome}/>
                        ))}
                        
                    </HorizontalScroll>
                </div>

                <h3>Envios</h3>

                <div className="graph-content">

                    <div className="description">

                        { sms === 1 &&
                        <div style={{borderLeft: '2px solid #f9cb46'}}>
                            <b>{loading ? <Skeleton count={1} /> : enviosSms}</b>
                            <span>SMS</span>
                        </div>
                        }

                        { flashSms === 1 &&
                        <div style={{borderLeft: '2px solid #1ed7fb'}}>
                            <b>{loading ? <Skeleton count={1} /> : enviosFlashSms}</b>
                            <span>FlashSMS</span>
                        </div>
                        }

                        { whatsapp === 1 &&
                        <div style={{borderLeft: '2px solid #499dff'}}>
                            <b>{loading ? <Skeleton count={1} /> : enviosWhatsApp}</b>
                            <span>WhatsApp</span>
                        </div>
                        }

                    </div>

                    <div className="graph-load" id="graph-width">
                    {loading ? <Skeleton height={240} count={1} /> :
                        <BarChart barSize={10} width={widthGraph} height={261} data={data}>
                            
                            <CartesianGrid strokeDasharray="1 1" />
                            <Tooltip />
                            <XAxis dataKey="name" />

                            { sms === 1 &&
                                <Bar dataKey="sms" fill="#f9cb46" />
                            }
                            { flashSms === 1 &&
                                <Bar dataKey="flashsms" fill="#1ed7fb" />
                            }
                            { whatsapp === 1 &&
                                <Bar dataKey="whatsapp" fill="#499dff" />
                            }

                        </BarChart>
                    }
                    </div>

                </div>

            </div>

            <div className="video-phone"></div>

        </div>

    )

}