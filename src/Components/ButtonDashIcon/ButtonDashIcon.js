import React from 'react'
import { Link } from 'react-router-dom';

//scss
import './ButtonDashIcon.scss'

const ButtonDashIcon = (props) => (

    <Link to={props.to} className="button-dash-icon" style={{width: props.width}}>
        <span className="icon">
            <img alt="icone" src={props.icon}/>
        </span>
        <span className="text">
            <b>{props.title}</b>
            <i>{props.description}</i>
        </span>
    </Link>

)
export default ButtonDashIcon