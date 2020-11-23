import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { api } from '../../Api/app'

//scss
import './Login.scss'
//images
import Logo from '../../Images/logo_color.png'
import messageStore from '../../Store/MessageStore'

export default function Login(props) {
    
    const history = useHistory()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

    }, [props]);

    async function handleLogin(e){

        e.preventDefault()

        try {

            var response = await api.post('session/login', { login, password })
        
            if ( response.data.error === true ){

                throw response.data.message

            }

            window.localStorage.setItem('token', response.data.token)
            window.location.href="/"

        } catch ( e ) {

            messageStore.addError(e)

        }

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
                            <input autoFocus={'true'} placeholder="usuário" onChange={(e) => setLogin(e.target.value)}/>
                            <i className="email"></i>
                        </label>
                        <label>
                            <input placeholder="senha" type="password" onChange={(e) => setPassword(e.target.value)}/>
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