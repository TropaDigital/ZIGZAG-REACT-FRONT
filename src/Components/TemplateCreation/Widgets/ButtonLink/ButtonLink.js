import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import LabelColor from '../../Edition/LabelColor'

import './ButtonLink.scss'

const ButtonLink = (props) => {

    const options = props.item.options

    const styleOptions = {
        width: options.width+options.widthType,
        height: options.height+options.height !== 'auto' ? options.heightType : '',
        color: options.color,
        backgroundColor: options.backgroundColor,
    }

    function handleLink()
    {

        window.open(options.href, '_blank');

    }

    return(

        <div className="buttonlink-widget" style={styleOptions} onClick={handleLink}>

            <i className={options.ico}></i>
            <span>
                {options.name}
            </span>

        </div>

    )

}

const ButtonLinkEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    useEffect(() => {

        console.log( item )
        setOptions({})
        setOptions(item.options)

    }, [item, options])

    function handleOnChange(e)
    {

        if ( e.target.name === 'src' ){

            var linkVideo = e.target.value
                linkVideo = e.target.value.split('watch?v=')
                linkVideo = linkVideo[0]+'embed/'+linkVideo[1]

            e.target.value = linkVideo

        }

        options[e.target.name] = e.target.value

        onSave(options)

        setOptions({})

    }

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <FieldsetWidget legend="Nome" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="name" defaultValue={options.name} />
                </FieldsetWidget>

                <FieldsetWidget legend="URL" full={true}>
                    <input type="text" onChange={(e) => handleOnChange(e)} name="href" defaultValue={options.href} />
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

                <div className="group">
                    <FieldsetWidget>
                        <LabelColor name="color" color={options.color} value="Cor do Texto" onChange={handleOnChange}/>
                        <LabelColor name="backgroundColor" color={options.backgroundColor} value="Cor do Fundo" onChange={handleOnChange}/>
                    </FieldsetWidget>
                </div>

            </FormEditWidget>

        }
        </>

    )

}

export { ButtonLink, ButtonLinkEdit } 