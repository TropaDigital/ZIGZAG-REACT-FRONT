import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import LabelFontFamily from '../../Edition/LabelFontFamily'
import LabelTextAlign from '../../Edition/LabelTextAlign'
import LabelFontSize from '../../Edition/LabelFontSize'
import LabelLineHeight from '../../Edition/LabelLineHeight'
import LabelPadding from '../../Edition/LabelPadding'
import LabelColor from '../../Edition/LabelColor'

import './Text.scss'

const Text = (props) => {

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

        <div className="text-widget" style={styleOptions} dangerouslySetInnerHTML={{ __html: options.text }}/>

    )

}

const TextEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})
    
    useEffect(() => {

        console.log(item)
        setOptions(item.options)
        setLoad(false)
        onSave(options)

    }, [item])

    useEffect(() => {

        console.log('options alterado', options)

    }, [item, options, setOptions])

    function handleOnChangeText(evt, editor)
    {

        options.text = editor.getData()
        //setOptions({})
        onSave(options)

    }

    function handleChangeCkEditor()
    {

        var styleOptions = {}

        if ( !options.fontFamily ){
            styleOptions = item.options
        } else {
            styleOptions = options
        }

        var ckEditorElement = document.getElementsByClassName('ck-editor__main')[0].style
            ckEditorElement.fontFamily = styleOptions.fontFamily
            ckEditorElement.fontSize = styleOptions.fontSize
            ckEditorElement.lineHeight = styleOptions.lineHeight
            ckEditorElement.textAlign = styleOptions.textAlign

            ckEditorElement.color = styleOptions.color
            ckEditorElement.backgroundColor = styleOptions.backgroundColor

            ckEditorElement.paddingTop = styleOptions.paddingTop
            ckEditorElement.paddingLeft = styleOptions.paddingLeft
            ckEditorElement.paddingRight = styleOptions.paddingRight
            ckEditorElement.paddingBottom = styleOptions.paddingBottom

    }

    function handleOnChange(e)
    {

        options[e.target.name] = e.target.value
        setOptions(options)
        
        handleChangeCkEditor()
        onSave(options)

    }

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <div className="group" style={{flexDirection: 'column'}}>
                    <CKEditor 
                        editor={ ClassicEditor }
                        onInit={(e) => handleChangeCkEditor(e)}
                        config={{     
                            fontFamily: {
                                options: [
                                    'default',
                                    'Ubuntu, Arial, sans-serif',
                                    'Ubuntu Mono, Courier New, Courier, monospace'
                                ]
                            },
                            toolbar: ["bold", "italic", "font", "link", "heading"],
                        }}   
                        style={{lineHeight: '100px'}}
                        data={options.text} 
                        onChange={handleOnChangeText}
                    />

                    <p style={{fontSize: '10px', marginTop: '10px', color: '#727b84'}}><b>DICA:</b> Você pode utilizar os dados do contato usando a tag [nome], [sobrenome], [celular], etc. Mas cuidado ao usar tags que o usuário não possui o campo pode ficar vázio.</p>

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

export { Text, TextEdit } 