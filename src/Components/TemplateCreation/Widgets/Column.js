import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'
import WidgetRender from '../WidgetRender/WidgetRender'

const ColumnElement = (props) => {

    const [items, setItems] = useState(...[props.row])

    useEffect(() => {

        //setItems(...[props.row])

    }, [props])

    function handleSetItems( state ) {

        setItems(state)
        
        props.handleSetList( state, props.keyElement )

    }

    return (
        <div className="item-column">
            <ReactSortable 
                group="shared"
                animation={150}
                list={items}
                setList={handleSetItems}
                onEnd={(e) => console.log(e)}
            >
                { items && items.map((item, itemkey) => 
                    <WidgetRender
                        id={item.id}
                        item={item.template}
                        indice={props.keyElement}
                        key={itemkey}
                        editId={props.editId}
                        template={props.template}
                        editWidget={props.editWidget}
                        removeWidget={props.handleRemoveList}
                        edit={true}
                        setLoading={props.setLoading}
                    />
                        
                )}

            </ReactSortable>
        </div>
    )

}

const Column = (props) => {
    
    const [content, setContent] = useState([])

    useEffect(() => {

        setContent(...[props.item.content])

    }, [props])

    useEffect(() => {

        

    }, [content])

    function handleSetList(state, indice)
    {

        var newContent = []

        content.map((row, key) => {

            newContent[key] = row

            if ( key === indice ){
                newContent[key] = state
            }

        })

        console.log('handleSetList', newContent, props.id)

        if ( newContent.length === content.length ) props.updateWidgetColumn( newContent, props.id )

    }

    function handleRemoveList(id)
    {

        var newContent = []

        content.map((row,key)=>{

            newContent[key] = row.filter( obj => 
                obj.id !== id
            )

        })
        
        console.log( newContent )

        props.updateWidgetColumn( newContent, props.id )
        setContent(...newContent)


    }

    return(

        <div className="columns">
            { content.map((row, key) =>
                <ColumnElement handleRemoveList={handleRemoveList} handleSetList={handleSetList} row={row} keyElement={key} {...props}/>
            )}
        </div>

    )

}

const ColumnEdit = ({options}) => {
    
    return(

        <div>
            dados de edição width
        </div>

    )

}

export { Column, ColumnEdit } 