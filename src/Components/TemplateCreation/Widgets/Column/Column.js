import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'
import LabelColor from '../../Edition/LabelColor'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import WidgetRender from '../../WidgetRender/WidgetRender'

import './Columns.scss'

const ColumnElement = (props) => {

    const [items, setItems] = useState(...[props.row])

    const options = props.item.options

    const styleOptions = {
        padding: options.padding,
        backgroundColor: options.backgroundColor,
        minHeight: options.minHeight+options.minHeightType,
    }

    useEffect(() => {

        setItems(...[props.row])

    }, [props])

    function handleSetItems( state ) {

        if ( props.edit === true ){
            setItems(state)
            props.handleSetList( state, props.keyElement )
        } else {
            //alert('Alo alo')
        }

    }

    return (
        <div className="item-column" style={styleOptions}>
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
                        edit={props.edit}
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
                <ColumnElement edit={props.edit} handleRemoveList={handleRemoveList} handleSetList={handleSetList} row={row} keyElement={key} {...props}/>
            )}
        </div>

    )

}


const ColumnEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    useEffect(() => {

        console.log( item )
        setOptions({})
        setOptions(item.options)

    }, [item, options])

    function handleOnChange(e)
    {

        //setLoad(true)
        options[e.target.name] = e.target.value
        console.log(options)
        setOptions({})

    }

    return(

        <FormEditWidget onSave={onSave} item={item}>

            <FieldsetWidget legend="Altura minima">
                <input type="text" onChange={(e) => handleOnChange(e)} name="minHeight" defaultValue={options.minHeight} />
                <select onChange={(e) => handleOnChange(e)} name="minHeightType" defaultValue={options.minHeightType}>
                    <option value="px">pixel</option>
                </select>
            </FieldsetWidget>

            <FieldsetWidget legend="Espaçamento">
                
                <select onChange={(e) => handleOnChange(e)} name="padding" value={options.padding}>
                    <option value="0px">0</option>
                    <option value="1px">1</option>
                    <option value="2px">2</option>
                    <option value="3px">3</option>
                    <option value="4px">4</option>
                    <option value="5px">5</option>
                    <option value="6px">6</option>
                    <option value="7px">7</option>
                    <option value="8px">8</option>
                    <option value="9px">9</option>
                    <option value="10px">10</option>
                </select>

                <div>
                    <LabelColor 
                        value="Cor do Fundo"
                        name="backgroundColor" 
                        onChange={handleOnChange} 
                        color={options.backgroundColor}
                    />
                </div>

            </FieldsetWidget>

        </FormEditWidget>

    )

}

export { Column, ColumnEdit } 