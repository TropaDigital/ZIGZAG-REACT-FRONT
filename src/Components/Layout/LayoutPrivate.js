import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//scss
import './LayoutPrivate.scss'
//images
import Logo from '../../Images/logo.png'
import MaleSupport from '../../Images/male_support.png'
//images_icons
import IconDashboard from '../../Images/icos/icon_dashboard.png'
import IconCampgain from '../../Images/icos/icon_campgain.png'
import IconTemplate from '../../Images/icos/icon_template.png'
import IconAnalytics from '../../Images/icos/icon_analytics.png'
import IconConfiguration from '../../Images/icos/icon_configuration.png'
import IconTicket from '../../Images/icos/icon_ticket.png'
import IconFaq from '../../Images/icos/icon_faq.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function LayoutPrivate(props){

    const history = useHistory()

    const [page, setPage] = useState('/'+props.location.pathname.split('/')[1])


    useEffect(() => {

        setPage('/'+props.location.pathname.split('/')[1])
        scrollTop()

    }, [props])

    function scrollTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <div id="zigzag">

            <nav className="nav-left">

                <div className="logo">
                    <img alt="Logo" src={Logo}/>
                </div>

                <div className="link">
                    <Link className={page === '/nova-campanha' ? 'active' : 'no-active'} to="/nova-campanha">
                        <b>+</b>
                        <span>Nova campanha</span>
                    </Link>
                </div>

                <ul>

                    <li>
                        <Link className={page === '/' ? 'active' : 'no-active'} to="/">
                            <img alt="Icone dashboard" src={IconDashboard}/>
                            <span className="text">Dashboard</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li style={{marginTop: '10px'}}>
                        <span>Gerenciamento</span>
                    </li>

                    <li>
                        <Link className={page === '/campanhas' ? 'active' : 'no-active'} to="/campanhas">
                            <img alt="Icone campanha" src={IconCampgain}/>
                            <span className="text">Minhas Campanhas</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <Link className={page === '/templates' ? 'active' : 'no-active'} to="/templates/">
                            <img alt="Icone template" src={IconTemplate}/>
                            <span className="text">Templates</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <Link className={page === '/analytics' ? 'active' : 'no-active'} to="/analytics">
                            <img alt="Icone analytics" src={IconAnalytics}/>
                            <span className="text">Analytics</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <Link className={page === '/configuracoes' ? 'active' : 'no-active'} to="/configuracoes">
                            <img alt="Icone configurações" src={IconConfiguration}/>
                            <span className="text">Configurações</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <span>Suporte</span>
                    </li>

                    <li style={{display: 'none'}}>
                        <Link className={page === '/tickets' ? 'active' : 'no-active'} to="/tickets">
                            <img alt="Icone Ticket" src={IconTicket}/>
                            <span className="text">Tickets</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <Link className={page === '/faq' ? 'active' : 'no-active'} to="/faq">
                            <img alt="Icone FAQ" src={IconFaq}/>
                            <span className="text">FAQ</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                </ul>

                <div className="suport">
                    <Link className={page === '/faq' ? 'active' : 'no-active'} to="/faq">

                        <span className="title">Centro de Ajuda</span>
                        <span className="description">Visite o nosso centro de ajuda</span>
                        <span className="link">Visitar</span>

                        <img alt="Suporet" src={MaleSupport}/>

                    </Link>
                </div>

            </nav>

            <section className="section-private">

                <header>

                    <div className="left">
                        <div className="name-client">
                            {props.user.account.nome}
                        </div>
                    </div>

                    <div className="right">

                        <div className="notification">
                            <button onClick={() => history.push('/notificacoes')}>
                            
                            { props.logs.total > 0 &&
                                <span id="total-notification">{props.logs.total}</span>
                            }

                            </button>
                        </div>

                        <div className="menu-user">
                            
                            <button>
                                <i id="img-profile" style={{backgroundImage: 'url('+props.user.foto+')'}}></i>
                                <span id="name-user">{props.user.nome}</span>
                            </button>

                            <div className="submenu">

                                <Link to="/configuracoes">Configurações</Link>
                                <Link to="/configuracoes/dados-pagamento">Dados de cobrança</Link>
                                <Link to="/notificacoes">Notificações</Link>
                                <Link to="/login">Sair</Link>

                            </div>

                        </div>

                    </div>

                </header>

                <div className="content">

                    {props.children}

                </div>

            </section>

        </div>
    )

}