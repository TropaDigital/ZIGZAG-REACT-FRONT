import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import { api } from '../../../../Api/app'

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

    useEffect(() => {

        if ( !options.src ){
            options.src = ImageDefault
        }

    }, [props])

    return(

        <div className="image-widget">
            <img src={options.src} style={styleOptions}/>
        </div>

    )

}

const ImageEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    const styleOptions = {
        minWidth: options.minWidth+options.minWidthType,
        maxWidth: options.maxWidth+options.maxWidthType,
        width: options.width+options.widthType,
        minHeight: options.minHeight+options.minHeightType,
        maxHeight: options.maxHeight+options.maxHeightType,
        height: options.height+options.heightType,
    }

    const [image, setImage] = useState('')

    useEffect(() => {

        console.log( item )
        setOptions({})
        setImage(item.options.src)
        setOptions(item.options)
        onSave(options)

    }, [item, options])

    function handleOnChange(e)
    {

        options[e.target.name] = e.target.value
        setOptions({})
        onSave(options)


    }

    async function handleUpload(e)
    {


        var formData = new FormData()
            formData.append("file", e.target.files[0], e.target.files[0].name)

        let response = await api.post('templates/upload', formData)

        options.src = response.data.link
        setImage(response.data.link)
        onSave(options)
        
    }

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <FieldsetWidget legend="Escolha a imagem" className="upload-img">
                    
                    <div className="img">
                        <img src={image} style={styleOptions}/>
                    </div>
                    <label>
                        <span className="upload">
                            Enviar imagem <i></i>
                        </span>
                        <input id="upload-button" onChange={handleUpload} type="file" name="file"/>
                    </label>
                    <p>Tamanho máximo da imagem <b>256mb</b></p>
                    
                </FieldsetWidget>                 

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

                <FieldsetWidget legend="URL da imagem" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="src" defaultValue={options.src} />
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { Image, ImageEdit } 