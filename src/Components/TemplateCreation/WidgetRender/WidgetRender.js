import React, { useState, useEffect } from 'react'
import ButtonWidget from '../ButtonWidget/ButtonWidget'
import WidgetStore from '../../../Helper/WidgetStore'

const WidgetRender = (props) => {

    const [componentRender, setComponentRender] = useState(false)

    useEffect(() => {

        var componentRender = WidgetStore.getState().filter( obj => 
            obj.template.name === props.item.name
        )[0]

        var comp = {
            component: componentRender.template.component,
            componentEdit: componentRender.template.componentEdit
        }

        setComponentRender( comp )

    }, [props])

    return(
        <div className={props.editId === props.id ? props.item.className+' item-renderized edit' : props.item.className+' item-renderized'}>

            { props.edit === true &&
                <ButtonWidget
                    editWidget={props.editWidget}
                    removeWidget={props.removeWidget}
                    item={props.item}
                    id={props.id}
                    indice={props.indice}
                    componentEdit={componentRender.componentEdit}
                    setLoading={props.setLoading}
                />
            }

            { componentRender &&
                <componentRender.component 
                    updateWidgetColumn={props.updateWidgetColumn}
                    template={props.template}
                    editWidget={props.editWidget}
                    removeWidget={props.removeWidget}
                    indice={props.indice}
                    item={props.item}
                    id={props.id}
                    editId={props.editId}
                    setLoading={props.setLoading}
                />
            }

        </div>
    )
}

export default WidgetRender