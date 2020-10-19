import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'

import ImageDefault from '../../../../Images/widgets/image_default.png'

import './Image.scss'

const Image = (props) => {

    const options = props.item.options

    const styleOptions = {
        minWidth: options.minWidth+options.minWidthType,
        maxWidth: options.maxWidth+options.maxWidthType,
        width: options.width+options.widthType,
        minHeight: options.minHeight+options.minHeightType,
        maxHeight: options.maxHeight+options.maxHeightType,
        height: options.height+options.heightType,
    }

    return(

        <div className="image-widget">
            <img src={ !options.src ? ImageDefault : options.src } style={styleOptions}/>
        </div>

    )

}

const ImageEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    useEffect(() => {

        console.log( item )
        setOptions({})
        setOptions(item.options)

    }, [item, options])

    function handleOnChange(e)
    {

        options[e.target.name] = e.target.value
        setOptions({})


    }

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <FieldsetWidget legend="Largura">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="width" defaultValue={options.width} />
                    <select onChange={(e) => handleOnChange(e)} name="widthType" value={options.widthType}>
                        <option value="px">pixel</option>
                        <option value="%">porcentagem</option>
                    </select>
                </FieldsetWidget>

                <FieldsetWidget legend="Altura">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="height" defaultValue={options.height} />
                    <select onChange={(e) => handleOnChange(e)} name="heightType" defaultValue={options.heightType}>
                        <option value="px">pixel</option>
                    </select>
                </FieldsetWidget>

                <FieldsetWidget legend="Imagem">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="src" defaultValue={options.src} />
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { Image, ImageEdit } 