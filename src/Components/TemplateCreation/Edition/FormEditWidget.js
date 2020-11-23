import React from 'react'

const FormEditWidget = ({onSave, item, children}) => (

    <form onSubmit={() => onSave(item)}>

        <div className="fieldsets">

            {children}

        </div>

    </form>

)
export default FormEditWidget