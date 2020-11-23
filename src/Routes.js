import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect, useHistory } from 'react-router-dom'
import { api, TOKEN } from './Api/app'

import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

//views
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login/Login'

//template
import Index from './Pages/Templates/Index'
import Creation from './Pages/Templates/Creation'
import Detalhe from './Pages/Templates/Detalhe'

//campanhas
import NovaCampanha from './Pages/NovaCampanha/NovaCampanha'
import Campanhas from './Pages/Campanhas/Campanhas'

//components
import LayoutPrivate from './Components/Layout/LayoutPrivate'
import Configuracoes from './Pages/Usuario/Configuracoes'
import Faq from './Pages/Faq/Faq'
import Notificacoes from './Pages/Notificacoes/Notificaoes'
import DadosPagamento from './Pages/Usuario/DadosPagamento'
import Analytics from './Pages/Analytics/Analytics'

import messageStore from './Store/MessageStore'

const Tickets = () => (
  <div className="page"><h1>Tickets</h1></div>
)

//export function default
export default function Routes(props) {

  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState({
    account: {
      nome: ''
    }
  })

  const [logs, setLogs] = useState([])

  const [redirectLogin, setRedirectLogin] = useState(false)

  useEffect(() => {

    if ( TOKEN ){

      api.get('profile').then( profile => {

        setUser( profile.data )

        setLoading( false )

        api.get('logs').then( logs => {

          setLogs( logs.data )

        })

      }).catch(e => {

        messageStore.addError('Sua sessão foi finalizada.')
        window.localStorage.removeItem('token')
        setRedirectLogin(true)
        setLoading(false)

      })

    } else {

      setLoading( false )

    }

  }, [props])

  function NoMatch() {

    let location = useLocation();
  
    return (
      <div id="page-no-banner">
        <section>
          <div className="container">
            <h1>Pagina nao encontrada.</h1>
            <h3>
              <code>{location.pathname}</code>
            </h3>
          </div>
        </section>
      </div>
    )

  }

  function PrivateRoute({ children, ...rest }) {

    return (
      <Route
          {...rest}
          render={({ location }) =>
            window.localStorage.getItem('token') ? (
                children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
      />
    )

  }

  return(

      <Router>

        <ReactNotification />
        { redirectLogin === true && 
          <Redirect
            to={{
              pathname: "/login",
              state: {}
            }}
          /> 
        }

        { loading === true && <div>Carregando</div> }

        { loading === false &&
          <Switch>

            <Route exact path="/login" component={Login}/>
            <Route exact path="/t/:id" component={Detalhe}/>

            <LayoutPrivate user={user} logs={logs}>

              <PrivateRoute exact path="/">
                <Route component={Dashboard}/>
              </PrivateRoute>

              <PrivateRoute exact path="/nova-campanha">
                <Route component={NovaCampanha}/>
              </PrivateRoute>

              <PrivateRoute exact path="/campanhas">
                <Route component={Campanhas}/>
              </PrivateRoute>

              <PrivateRoute exact path="/templates/">
                <Route component={Index}/>
              </PrivateRoute>

              <PrivateRoute exact path="/templates/create/:id">
                <Route component={Creation}/>
              </PrivateRoute>

              <PrivateRoute exact path="/analytics">
                <Route component={Analytics}/>
              </PrivateRoute>

              <PrivateRoute exact path="/configuracoes">
                <Route component={Configuracoes}/>
              </PrivateRoute>

              <PrivateRoute exact path="/configuracoes/dados-pagamento">
                <Route component={DadosPagamento}/>
              </PrivateRoute>

              <PrivateRoute exact path="/tickets">
                <Route component={Tickets}/>
              </PrivateRoute>

              <PrivateRoute exact path="/faq">
                <Route component={Faq}/>
              </PrivateRoute>

              <PrivateRoute exact path="/notificacoes">
                <Route component={Notificacoes}/>
              </PrivateRoute>

            </LayoutPrivate>

          </Switch>
        }

      </Router>

    )

}