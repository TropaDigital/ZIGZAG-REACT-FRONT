import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'

import LabelFontFamily from '../../Edition/LabelFontFamily'
import LabelTextAlign from '../../Edition/LabelTextAlign'
import LabelFontSize from '../../Edition/LabelFontSize'
import LabelLineHeight from '../../Edition/LabelLineHeight'
import LabelPadding from '../../Edition/LabelPadding'
import LabelColor from '../../Edition/LabelColor'

import './Button.scss'

const Button = (props) => {

    const options = props.item.options

    const styleOptions = {
        fontFamily: options.fontFamily,
        textAlign: options.textAlign,
        fontSize: options.fontSize,
        lineHeight: options.lineHeight,

        backgroundColor: options.backgroundColor,
        color: options.color,

        paddingTop: options.paddingTop,
        paddingBottom: options.paddingBottom,
        paddingLeft: options.paddingLeft,
        paddingRight: options.paddingRight,
    }

    return(

        <div className="button-widget">
            <button style={styleOptions}>
                {options.text}
            </button>
        </div>

    )

}

const ButtonEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})
    
    useEffect(() => {

        setOptions(item.options)
        setLoad(false)

    }, [item])

    useEffect(() => {

        console.log('options alterado', options)

    }, [item, options, setOptions])

    function handleOnChange(e)
    {

        options[e.target.name] = e.target.value
        setOptions(options)

    }

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <div className="group">
                    <FieldsetWidget legend="Texto do botão">
                        <input 
                            type="text" 
                            onChange={(e) => handleOnChange(e)} 
                            name="text" 
                            defaultValue={options.text}
                            style={{fontFamily: options.fontFamily}}
                        />
                    </FieldsetWidget>
                </div>

                <div className="group">
                    <FieldsetWidget legend="Link">
                        <input 
                            type="text" 
                            onChange={(e) => handleOnChange(e)} 
                            name="link" 
                            defaultValue={options.link} 
                        />
                    </FieldsetWidget>
                </div>

                <div className="group">
                    <LabelFontFamily 
                        full={true} 
                        value={options.fontFamily} 
                        onChange={handleOnChange}
                    />
                    <LabelTextAlign 
                        full={true} 
                        value={options.textAlign} 
                        onChange={handleOnChange}
                    />
                </div>

                <div className="group">
                    <LabelFontSize 
                        full={true}
                        value={options.fontSize} 
                        onChange={handleOnChange}
                    />
                    <LabelLineHeight 
                        full={true} 
                        value={options.lineHeight} 
                        onChange={handleOnChange}
                    />
                </div>

                <div className="group">
                    <FieldsetWidget>
                        <LabelColor name="color" color={options.color} value="Cor do Texto" onChange={handleOnChange}/>
                        <LabelColor name="backgroundColor" color={options.backgroundColor} value="Cor do Fundo" onChange={handleOnChange}/>
                    </FieldsetWidget>
                </div>

                <div className="group">
                    <LabelPadding 
                        full={true}
                        value={options} 
                        onChange={handleOnChange}
                    />
                </div>

            </FormEditWidget>

        }
        </>

    )

}

export { Button, ButtonEdit } 