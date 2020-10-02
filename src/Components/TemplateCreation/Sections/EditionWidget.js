import React from 'react'

const EditionWidget = (props) => {

    return(
        <div className="edition-widget">

            { props.editionWidgetEdit.component &&
                <>
                    <button onClick={() => props.setEditionWidgetEdit({id: null})}>Fechar</button>
                    <props.editionWidgetEdit.component 
                        onSave={props.onSave} 
                        item={props.editionWidgetEdit.item}
                        id={props.editionWidgetEdit.id}
                    />
                </>
            }

        </div>
    )
}

export default EditionWidget