import React, {useState, useEffect} from 'react'

import { useHistory } from 'react-router-dom'
import IconButton from '../../Icon/IconButton'

export default function PreviewTemplate(props)
{

    const history = useHistory()

    const [open, setOpen] = useState(false)

    const element = document.getElementById("tropa")

    useEffect(() => {



    }, [props])

    useEffect(() => {

        

    }, [open])

    function handleOpen()
    {

        setOpen(true)
        element.classList.add("blur")

    }

    function handleClose()
    {

        setOpen(false)
        element.classList.remove("blur")

    }

    function handleRedirect()
    {
        setOpen(false)
        element.classList.remove("blur")

        console.log( props.propsRedirect )

        history.push({
            pathname: '/templates/create/'+props.id,
            state: props.propsRedirect
        })

    }

    return(

        <>

            

            {props.children ? 
                <div onClick={() => open === true ? handleClose(false) : handleOpen(false)}>
                    {props.children}
                </div>
                : 
                <button type="button" className="button-zig secondary" onClick={() => open === true ? handleClose(false) : handleOpen(false)}>
                    <IconButton icon="view"/>
                    <span>Visualizar</span>
                </button>
            }

            { open === true &&        
                <div id="box-phone">

                    <button className="button-zig danger" onClick={() => open === true ? handleClose(false) : handleOpen(false)}>
                        <IconButton icon="close"/>
                        <span>Fechar</span>
                    </button>

                    <div className="modal">

                        <div className="phone">

                            <iframe src={"/t/"+props.id}/>

                        </div>

                        <div>
                            { props.nome && <h3>{props.nome}</h3> }
                            <a className="animate__animated" onClick={() => handleRedirect()}>Editar template</a>
                        </div>

                    </div>
                </div>
            }
        </>

    )

}