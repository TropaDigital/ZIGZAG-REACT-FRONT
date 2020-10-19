
import React, { useEffect, useState } from 'react'
import WidgetRender from '../../Components/TemplateCreation/WidgetRender/WidgetRender'

import './Templates.scss'

export default function Detalhe(props) {

    const [loading, setLoading] = useState(false)

    const [template, setTemplate] = useState([])

    useEffect(() => {

        var preDefinido = window.localStorage.getItem('template')

        if ( preDefinido ) {
            preDefinido = JSON.parse(preDefinido)
            setTemplate( ...[preDefinido] )
        }

    }, [props])

    return(

        <div id="templates" className="page">

            {loading === false && template.map((item, key) => (
                <WidgetRender
                    updateWidgetColumn={() => {}}
                    id={item.id}
                    item={item.template}
                    indice={key}
                    editId={() => {}}
                    setLoading={setLoading}
                    template={template}
                    editWidget={() => {}}
                    removeWidget={() => {}}
                    key={key}
                    edit={false}
                />
            ))}

        </div>

    )

}