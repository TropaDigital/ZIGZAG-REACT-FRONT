import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import LabelColor from '../../Edition/LabelColor'
import { api } from '../../../../Api/app'

import ImageDefault from '../../../../Images/widgets/image_default.png'

import './Offer.scss'

const Offer = (props) => {

    const options = props.item.options

    useEffect(() => {

        if ( !options.src ){
            options.src = ImageDefault
        }

    }, [props])

    return(

        <div className="offer-widget">

            { options.title &&
                <p className="title" style={{color: options.colorTitle}}>{options.title}</p>
            }

            <div className="img" style={{height: options.height+options.heightType, backgroundImage: 'url('+options.src+')',}}>

                <div className="values" style={{color: options.colorText, backgroundColor: options.backgroundColor}}>
                    
                    <div>
                        <span>
                            <span className="prev">de</span>
                            <span className="next">{options.valuePrev}</span>
                        </span>

                        <span>
                            <span className="prev">por</span>
                            <span className="next"><b>{options.valueNext}</b></span>
                        </span>
                    </div>

                </div>

            </div>
        </div>

    )

}

const OfferEdit = ({id, item, onSave, onClose}) => {
    
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

                <FieldsetWidget legend="URL da imagem" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="src" defaultValue={options.src} />
                </FieldsetWidget>            

                <FieldsetWidget legend="Altura">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="height" defaultValue={options.height} />
                    <select onChange={(e) => handleOnChange(e)} name="heightType" defaultValue={options.heightType}>
                        <option value="px">pixel</option>
                    </select>
                </FieldsetWidget>

                <FieldsetWidget legend="Titulo" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="title" defaultValue={options.title} />
                </FieldsetWidget>

                <FieldsetWidget legend="Valor original" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="valuePrev" defaultValue={options.valuePrev} />
                </FieldsetWidget>

                <FieldsetWidget legend="Valor promocional" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="valueNext" defaultValue={options.valueNext} />
                </FieldsetWidget>

                <FieldsetWidget full={true}>
                    <div>
                        <LabelColor 
                            value="Cor do Título"
                            name="colorTitle" 
                            onChange={handleOnChange} 
                            color={options.colorTitle}
                        />
                        <LabelColor 
                            value="Cor do Texto"
                            name="colorText" 
                            onChange={handleOnChange} 
                            color={options.colorText}
                        />
                        <LabelColor 
                            value="Cor do Fundo"
                            name="backgroundColor" 
                            onChange={handleOnChange} 
                            color={options.backgroundColor}
                        />
                    </div>
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { Offer, OfferEdit } 