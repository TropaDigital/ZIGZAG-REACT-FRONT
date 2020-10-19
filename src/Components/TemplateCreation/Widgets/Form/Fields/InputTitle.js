import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../../Edition/FieldsetWidget'
import FormEditWidget from '../../../Edition/FormEditWidget'

import ToggleSwitch from '../../../../ToggleSwitch/ToggleSwitch'
import LabelFontFamily from '../../../Edition/LabelFontFamily'
import LabelTextAlign from '../../../Edition/LabelTextAlign'
import LabelFontSize from '../../../Edition/LabelFontSize'
import LabelLineHeight from '../../../Edition/LabelLineHeight'
import LabelPadding from '../../../Edition/LabelPadding'
import LabelColor from '../../../Edition/LabelColor'

const InputTitleEdit = ({item, onSave}) => {

    const [edit, setEdit] = useState(false)

    const [options, setOptions] = useState(item.style)

    useEffect(() => {

        setOptions(item.style)

    }, [edit])
    
    function handleOnSave()
    {

        alert('onSave')

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

                    <h4>{item.value}</h4>

                    <div className="group">

                        aqui entraaa

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