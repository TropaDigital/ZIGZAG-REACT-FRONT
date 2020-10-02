import React from 'react'

//scss
import './DateDashMonth.scss'

const DateDashMonth = (props) => (

    <div className={props.active === true ? 'date-dash-month active' : 'date-dash-month'}>
        <div className="day">
            <span>{props.day}</span>
        </div>
        <div className="month">
            {props.month}
        </div>
    </div>

)
export default DateDashMonth