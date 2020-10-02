
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { NavWidgets, EditionWidget } from '../../Components/TemplateCreation/Sections'
import WidgetRender from '../../Components/TemplateCreation/WidgetRender/WidgetRender'
import WidgetStore from '../../Helper/WidgetStore'

import './Templates.scss'

export default function Templates(props) {

    const [loading, setLoading] = useState(false)

    const [template, setTemplate] = useState([])

    const [editionWidgetEdit, setEditionWidgetEdit] = useState({
        id: null
    })

    useEffect(() => {

        var preDefinido = window.localStorage.getItem('template')

        if ( preDefinido ) {
            preDefinido = JSON.parse(preDefinido)
            setTemplate( ...[preDefinido] )
        }

    }, [props])

    useEffect(() => {

        setLoading(false)
        WidgetStore.setState()
        console.log(template, WidgetStore.getState())

    }, [template])

    function editWidget(item, id, componentEdit)
    {

        console.log(item, id)

        setEditionWidgetEdit({
            item: item,
            id: id,
            component: componentEdit
        })

    }

    function removeWidget(id)
    {

        setLoading(true)

        var newTemplates = template.filter( obj => 
            obj.id !== id
        )

        setTemplate( ...[newTemplates] )

        if ( editionWidgetEdit.id === id ){

            setEditionWidgetEdit({
                id: null
            })

            alert('Você apagou o widget que você estava editando.')

        }
        
    }

    function saveWidget(item)
    {

        setLoading(true)

        var widgets = []

        template.map((row, key) => {

            if ( row.id === item.id ){
                widgets[key] = item
            } else {
                widgets[key] = row
            }

        })

        setTemplate(widgets)
        setEditionWidgetEdit({id: null})

    }

    function updateWidgetColumn(contentState, id)
    {

        var widgets = []

        template.map((row) => {

            if (  row.id === id ){

                row.template.content = []
                row.template.content = contentState

            }

            widgets.push( row )

        })

        setTemplate(...[widgets])

        //setLoading(true)

    }

    return(

        <div id="templates" className="page">

            <div id="creation">

                <button onClick={() => window.localStorage.setItem('template', JSON.stringify(template))}>Salvar</button>

                <NavWidgets
                    template={template}
                />

                <div className="creation-layout">

                    <ReactSortable 
                        group="shared"
                        animation={150}
                        list={template}
                        setList={setTemplate}
                    >
                        {loading === false && template.map((item, key) => (
                            <WidgetRender
                                updateWidgetColumn={updateWidgetColumn}
                                id={item.id}
                                item={item.template}
                                indice={key}
                                editId={editionWidgetEdit.id}
                                setLoading={setLoading}
                                template={template}
                                editWidget={editWidget}
                                removeWidget={removeWidget}
                                key={key}
                                edit={true}
                            />
                        ))}
                    </ReactSortable>

                </div>

                <EditionWidget
                    editionWidgetEdit={editionWidgetEdit}
                    setEditionWidgetEdit={setEditionWidgetEdit}
                    onSave={saveWidget}
                />

            </div>


        </div>

    )

}