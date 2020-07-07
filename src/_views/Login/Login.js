import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

//scss
import './Login.scss'
//images
import Logo from '../../__images/logo_color.png'

export default function Login(props) {
    
    const history = useHistory()

    useEffect(() => {

    }, [props]);

    function handleLogin(e){

        e.preventDefault()

        window.localStorage.setItem('token', 'true')
        history.push('/')

    }

    return(

        <div id="login">

            <div className="form animate__animated">

                <div className="left animate__animated">

                    <div className="top">
                        <img alt="Logo" src={Logo}/>
                        <p>Faça login para acessar a plataforma</p>
                    </div>

                    <form onSubmit={handleLogin}>

                        <label>
                            <input autoFocus={'true'} placeholder="usuário"/>
                            <i className="email"></i>
                        </label>
                        <label>
                            <input placeholder="senha" type="password"/>
                            <i className="password"></i>
                        </label>

                        <Link to="/login">Esqueceu a senha?</Link>

                        <label>
                            <button>Entrar</button>
                        </label>

                    </form>

                </div>
                <div className="right animate__animated"></div>


            </div>

        </div>

    )

}