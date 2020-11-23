import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'

import './Video.scss'

const Video = (props) => {

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

        <div className="video-widget">

            <iframe style={styleOptions} src={options.src}></iframe>

        </div>

    )

}

const VideoEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    useEffect(() => {

        console.log( item )
        setOptions({})
        setOptions(item.options)
        onSave(options)

    }, [item, options])

    function handleOnChange(e)
    {

        if ( e.target.name === 'src' ){

            var linkVideo = e.target.value
                linkVideo = e.target.value.split('watch?v=')
                linkVideo = linkVideo[0]+'embed/'+linkVideo[1]

            e.target.value = linkVideo
            console.log(linkVideo)

        }

        options[e.target.name] = e.target.value

        onSave(options)
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

                <FieldsetWidget legend="URL do Youtube">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="src" defaultValue={options.src} />
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { Video, VideoEdit } 