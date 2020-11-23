
import React, { useEffect, useState } from 'react'
import { api } from '../../Api/app'
import WidgetRender from '../../Components/TemplateCreation/WidgetRender/WidgetRender'

import './Templates.scss'

export default function Detalhe(props) {

    const [loading, setLoading] = useState(false)

    const [template, setTemplate] = useState([])

    const id = props.match.params.id

    useEffect(() => {

        getData()

    }, [props])

    async function getData()
    {

        var response = await api.get('templates/'+id)

        if ( response.data.estrutura != '[{}]' ) {
            setTemplate( ...[JSON.parse(response.data.estrutura)] )
        }
        
    }

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