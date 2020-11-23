import React from 'react'

import "./FormDefault.scss"

const FormDefault = ({children, onSubmit}) => (

    <form className="form-default content-page" onSubmit={onSubmit}>
        {children}
    </form>

)

export default FormDefault