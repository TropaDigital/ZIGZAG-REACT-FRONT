import React, { useState } from 'react'

const EditionWidget = (props) => {

    const linkPlatform = window.location.protocol+'//'+window.location.host+'/template/preview'
    const qrCodeImg = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+linkPlatform

    return(
        <div className="edition-widget">

            { props.editionWidgetEdit.component ?
            
                <>
                    <div className="head">

                        <span>Editar {props.editionWidgetEdit.item.name}</span>
                        <button onClick={() => props.setEditionWidgetEdit({id: null})}>Fechar</button>

                    </div>
                    
                    <div className="content">
                        <props.editionWidgetEdit.component 
                            onSave={props.onSave} 
                            item={props.editionWidgetEdit.item}
                            id={props.editionWidgetEdit.id}
                        />
                    </div>
                </>
               
            :
            
            <div className="no-edition">

                <p>Para pré-visualizar o Template no seu celular, salve o template e aponte a camera para o QRCode abaixo.</p>

                <img src={qrCodeImg}/>

                <p>Caso prefira, digite no seu navegador o endereço: </p>

                <a>{linkPlatform}</a>

            </div>
            
            }

        </div>
    )
}

export default EditionWidget