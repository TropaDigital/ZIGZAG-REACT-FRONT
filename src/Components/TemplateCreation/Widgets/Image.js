import React, { useState, useEffect } from 'react'

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

        <img src={options.src} style={styleOptions}/>

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

        //setLoad(true)
        options[e.target.name] = e.target.value
        setOptions({})


    }

    return(

        <>
        { load === false && 

            <div>
                
                <fieldset>

                    <legend>largura</legend>
                    <input onChange={(e) => handleOnChange(e)} name="width" defaultValue={options.width} />
                    
                    <select onChange={(e) => handleOnChange(e)} name="widthType" value={options.widthType}>
                        <option value="px">pixel</option>
                        <option value="%">porcentagem</option>
                    </select>

                </fieldset>

                <fieldset>

                    <legend>altura</legend>

                    <input onChange={(e) => handleOnChange(e)} name="height" defaultValue={options.height} />

                    <select onChange={(e) => handleOnChange(e)} name="heightType" defaultValue={options.heightType}>
                        <option value="px">pixel</option>
                    </select>

                </fieldset>

                <fieldset>
                    <legend>imagem</legend>
                    <input onChange={(e) => handleOnChange(e)} name="src" defaultValue={options.src} />
                </fieldset>

                <button onClick={() => onSave(item)}>Save</button>

            </div>

        }
        </>

    )

}

export { Image, ImageEdit } 