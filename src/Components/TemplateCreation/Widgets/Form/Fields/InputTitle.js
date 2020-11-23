import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../../Edition/FieldsetWidget'
import FormEditWidget from '../../../Edition/FormEditWidget'

import LabelFontFamily from '../../../Edition/LabelFontFamily'
import LabelTextAlign from '../../../Edition/LabelTextAlign'
import LabelFontSize from '../../../Edition/LabelFontSize'
import LabelLineHeight from '../../../Edition/LabelLineHeight'
import LabelPadding from '../../../Edition/LabelPadding'
import LabelColor from '../../../Edition/LabelColor'

const InputTitleEdit = ({item, onSave}) => {

    const [edit, setEdit] = useState(false)

    const [fontFamily, setFontFamily] = useState(item.style.fontFamily)
    const [textAlign, setTextAlign] = useState(item.style.textAlign)
    const [fontSize, setFontSize] = useState(item.style.fontSize)
    const [lineHeight, setLineHeight] = useState(item.style.lineHeight)
    const [color, setColor] = useState(item.style.color)

    const [styleOptions, setStyleOptions] = useState()

    useEffect(() => {

        setStyleOptions({
            fontFamily: fontFamily,
            textAlign: textAlign,
            fontSize: fontSize,
            lineHeight: lineHeight,
            color: color
        })


    }, [fontFamily, textAlign, fontSize, lineHeight, color])
    
    function handleOnSave()
    {

        var data = item
            data.style = []
            data.style.fontFamily = fontFamily
            data.style.textAlign = textAlign
            data.style.fontSize = fontSize
            data.style.lineHeight = lineHeight
            data.style.color = color

        onSave(data)
        setEdit(false)

    }

    return(

        <>
            
            { edit === false ?

                <>
                    <div className="button-input">
                        <button type="button" className="edit" onClick={() => setEdit(true)}></button>
                    </div>
                </>

                :
                <div className="form-edit-input-text">

                    <h4 style={styleOptions}>{item.value}</h4>

                    <div className="group">
                        <LabelFontFamily 
                            full={true} 
                            value={fontFamily} 
                            onChange={(e) => setFontFamily(e.target.value)}
                        />
                        <LabelTextAlign 
                            full={true} 
                            value={textAlign} 
                            onChange={(e) => setTextAlign(e.target.value)}
                        />
                    </div>

                    <div className="group">
                        <LabelFontSize 
                            full={true}
                            value={fontSize} 
                            onChange={(e) => setFontSize(e.target.value)}
                        />
                        <LabelLineHeight 
                            full={true} 
                            value={lineHeight} 
                            onChange={(e) => setLineHeight(e.target.value)}
                        />
                    </div>

                    <div className="group">
                        <FieldsetWidget>
                            <LabelColor name="color" color={color} value="Cor do Texto" onChange={(e) => setColor(e.target.value)}/>
                        </FieldsetWidget>
                    </div>
                
                    <div className="buttons-submit">
                        <button type="button" className="button-default" style={{backgroundColor: 'white', color: '#939fb2'}} onClick={() => setEdit(false)}>Cancelar</button>
                        <button type="button" className="button-default" onClick={handleOnSave}>Aplicar</button>
                    </div>

                </div>
            }
        </>

    )

}

export default InputTitleEdit