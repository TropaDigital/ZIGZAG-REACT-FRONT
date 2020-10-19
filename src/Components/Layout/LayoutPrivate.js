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

export default function LayoutPrivate(props){

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
                            <img alt="Icone configuraÁ„o" src={IconConfiguration}/>
                            <span className="text">Configura√ß√µes</span>
                            <span className="bg"></span>
                        </Link>
                    </li>

                    <li>
                        <span>Suporte</span>
                    </li>

                    <li>
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
                            Zigzag
                        </div>
                        <div className="name-user">
                            Kaique Steck
                        </div>
                    </div>

                    <div className="right">

                        <div className="notification">
                            <button>
                                <span>3</span>
                            </button>
                        </div>

                        <div className="menu-user">
                            
                            <button>
                                <i style={{backgroundImage: 'url(https://i.ibb.co/YWMjDMd/image.png)'}}></i>
                                <span>Tropa Digital</span>
                            </button>

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