
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { NavWidgets, EditionWidget } from '../../Components/TemplateCreation/Sections'
import WidgetRender from '../../Components/TemplateCreation/WidgetRender/WidgetRender'
import WidgetStore from '../../Store/WidgetStore'
import { api } from '../../Api/app'

import './Templates.scss'
import messageStore from '../../Store/MessageStore'
import H1Page from '../../Components/Layout/H1Page'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Creation(props) {

    const history = useHistory()

    const [loading, setLoading] = useState(false)

    const [template, setTemplate] = useState([])

    const [name, setName] = useState('')

    const [editionWidgetEdit, setEditionWidgetEdit] = useState({
        id: null
    })
    
    const [topPhone, setTopPhone] = useState(0)

    const id = props.match.params.id

    useEffect(() => {

        window.onscroll = function () {
            if ( window.pageYOffset >= 100 ) {
                setTopPhone(window.pageYOffset - 100)
            } else {
                setTopPhone(0)
            }
        }

        api.get('templates/'+id).then( response => {
            setName(response.data.nome)
            if ( response.data.estrutura != '[{}]' ) {
                setTemplate( ...[JSON.parse(response.data.estrutura)] )
            }
        }).catch(e => {
            console.log('algo deu..')
            messageStore.addError('Algo deu errado...')
            history.push('/templates/')
        })            

    }, [props])

    useEffect(() => {

        setLoading(false)
        WidgetStore.setState()

        console.log('template update')

    }, [template])

    function editWidget(item, id, componentEdit)
    {

        setEditionWidgetEdit({
            item: false,
            id: false,
            component: false
        })

        setTimeout(function(){

            setEditionWidgetEdit({
                item: item,
                id: id,
                component: componentEdit
            })
            
        }, 0)

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

    }

    async function handleSaveTemplate()
    {

        var response = await api.put('templates/'+id, {
            nome: name,
            estrutura: JSON.stringify(template)
        })

        if ( response.data.error === true ){
            messageStore.addError(response.data.message)
        } else {

            if ( props.location.state ){
                history.push({
                    pathname: '/nova-campanha',
                    state: props.location.state
                })
            } else {
                messageStore.addSuccess('Template salvo.')
            }
            
        }

    }

    function handleResetTemplate()
    {

        setTemplate([])

    }


    return(

        <div id="templates" className="page">

            <H1Page state={props.location.state} nome={<input type="text" onChange={(e) => setName(e.target.value)} defaultValue={name}/>}/>

            <div id="creation">

                <NavWidgets
                    template={template}
                    handleResetTemplate={handleResetTemplate}
                    handleSaveTemplate={handleSaveTemplate}
                />

                <div className="creation-layout" id="template-widgets-user" style={{top: ''+topPhone+'px'}}>

                    <ReactSortable 
                        group="shared"
                        animation={150}
                        list={template}
                        setList={setTemplate}
                    >
                        {loading === false && template && template.map((item, key) => (
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
                    id={id}
                />

            </div>


        </div>

    )

}