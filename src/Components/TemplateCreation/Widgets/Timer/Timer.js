import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import LabelColor from '../../Edition/LabelColor'
import InputMask from 'react-input-mask'
import { api } from '../../../../Api/app'
import Countdown from 'react-countdown';

import ImageDefault from '../../../../Images/widgets/image_default.png'

import './Timer.scss'

const Timer = (props) => {

    const options = props.item.options

    useEffect(() => {

        if ( !options.src ){
            options.src = ImageDefault
        }

    }, [props])

    const renderer = ({ days, hours, minutes, seconds }) => {

          return (
            <div className="countdown">
                
                <div className="time">
                    <b style={{backgroundColor: options.backgroundColorSecondary, color: options.colorText}}>{days}</b>
                    <span style={{color: options.colorText}}>dias</span>
                </div>

                <div>
                    <i style={{color: options.colorText}}>:</i>
                </div>

                <div className="time">
                    <b style={{backgroundColor: options.backgroundColorSecondary, color: options.colorText}}>{hours}</b>
                    <span style={{color: options.colorText}}>horas</span>
                </div>

                <div className="time">
                    <i style={{color: options.colorText}}>:</i>
                </div>

                <div className="time">
                    <b style={{backgroundColor: options.backgroundColorSecondary, color: options.colorText}}>{minutes}</b>
                    <span style={{color: options.colorText}}>minutos</span>
                </div>

                <div>
                    <i style={{color: options.colorText}}>:</i>
                </div>

                <div className="time">
                    <b style={{backgroundColor: options.backgroundColorSecondary, color: options.colorText}}>{seconds}</b>
                    <span style={{color: options.colorText}}>segundos</span>
                </div>
            </div>
        )
        
    }

    return(

        <div className="timer-widget" style={{backgroundColor: options.backgroundColorPrimary}}>

            <p className="title" style={{color: options.colorText}}>{options.title}</p>

            <Countdown
                date={options.date}
                renderer={renderer}
            />

            <p className="texto" style={{color: options.backgroundColorSecondary}}>{options.text}</p>

        </div>

    )

}

const TimerEdit = ({id, item, onSave, onClose}) => {
    
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

                <FieldsetWidget legend="Titulo" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="title" defaultValue={options.title} />
                </FieldsetWidget>

                <FieldsetWidget legend="Texto" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="text" defaultValue={options.text} />
                </FieldsetWidget>

                <FieldsetWidget legend="Data" full={true}>
                    <InputMask 
                        mask="9999-99-99 99:99" 
                        placeholder="Ano-Mês-Dia Hora:Segundo"
                        onChange={(e) => handleOnChange(e)}
                        type="text" 
                        name="date"
                        value={options.date}
                    />
                </FieldsetWidget>

                <FieldsetWidget full={true}>
                    <div>
                        <LabelColor 
                            value="Cor do Título"
                            name="colorText" 
                            onChange={handleOnChange} 
                            color={options.colorText}
                        />
                        <LabelColor 
                            value="Cor do Fundo 1"
                            name="backgroundColorPrimary" 
                            onChange={handleOnChange} 
                            color={options.backgroundColorPrimary}
                        />
                        <LabelColor 
                            value="Cor do Fundo 2"
                            name="backgroundColorSecondary" 
                            onChange={handleOnChange} 
                            color={options.backgroundColorSecondary}
                        />
                    </div>
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { Timer, TimerEdit } 