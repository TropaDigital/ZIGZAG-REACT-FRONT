import React, { useState } from 'react'

const EditionWidget = (props) => {

    const linkPlatform = window.location.protocol+'//'+(window.location.host === 'localhost:3000' ? '192.168.15.14:3000' : window.location.host)+'/t/'+props.id
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

                <p>Para pré-visualizar o Template no seu celular, <span>salve o template</span> e aponte a camera para o QRCode abaixo.</p>

                <img src={qrCodeImg}/>

                <p>Caso prefira, digite no seu navegador o endereço: </p>

                <a href={linkPlatform} target="_blank">{linkPlatform}</a>

            </div>
            
            }

        </div>
    )
}

export default EditionWidget