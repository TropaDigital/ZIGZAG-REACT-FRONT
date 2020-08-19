import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom'

//views
import Dashboard from './_views/Dashboard/Dashboard'
import Login from './_views/Login/Login'
import Campanhas from './_views/Campanhas/Campanhas'

import NovaCampanha1 from './_views/NovaCampanha/Step1'
import NovaCampanha2 from './_views/NovaCampanha/Step2'
import NovaCampanha3 from './_views/NovaCampanha/Step3'
import NovaCampanha4 from './_views/NovaCampanha/Step4'
import NovaCampanha5 from './_views/NovaCampanha/Step5'

//components
import LayoutPrivate from './_components/Layout/LayoutPrivate'

const Templates = () => (
  <div className="page"><h1>Templates</h1></div>
)

const Analytics = () => (
  <div className="page"><h1>Analytics</h1></div>
)

const Configuracoes = () => (
  <div className="page"><h1>Configurações</h1></div>
)

const Tickets = () => (
  <div className="page"><h1>Tickets</h1></div>
)

const Faq = () => (
  <div className="page"><h1>Faq</h1></div>
)

//export function default
export default function Routes() {

  useEffect(() => {

  }, [])

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

        <Switch>

          <Route exact path="/login" component={Login}/>

          <LayoutPrivate>

            <PrivateRoute exact path="/">
              <Route component={Dashboard}/>
            </PrivateRoute>

            <PrivateRoute exact path="/nova-campanha">
              <Route component={NovaCampanha1}/>
            </PrivateRoute>
            <PrivateRoute exact path="/nova-campanha/step2">
              <Route component={NovaCampanha2}/>
            </PrivateRoute>
            <PrivateRoute exact path="/nova-campanha/step3">
              <Route component={NovaCampanha3}/>
            </PrivateRoute>
            <PrivateRoute exact path="/nova-campanha/step4">
              <Route component={NovaCampanha4}/>
            </PrivateRoute>
            <PrivateRoute exact path="/nova-campanha/step5">
              <Route component={NovaCampanha5}/>
            </PrivateRoute>

            <PrivateRoute exact path="/campanhas">
              <Route component={Campanhas}/>
            </PrivateRoute>

            <PrivateRoute exact path="/templates">
              <Route component={Templates}/>
            </PrivateRoute>

            <PrivateRoute exact path="/analytics">
              <Route component={Analytics}/>
            </PrivateRoute>

            <PrivateRoute exact path="/configuracoes">
              <Route component={Configuracoes}/>
            </PrivateRoute>

            <PrivateRoute exact path="/tickets">
              <Route component={Tickets}/>
            </PrivateRoute>

            <PrivateRoute exact path="/faq">
              <Route component={Faq}/>
            </PrivateRoute>

          </LayoutPrivate>

          <Route path="*">
            <NoMatch />
          </Route>

        </Switch>

      </Router>

    )

}