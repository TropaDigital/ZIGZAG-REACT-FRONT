import nextId from 'react-id-generator'
import { InputText, InputTextEdit } from "./Fields/InputText"

class FieldsStore {

    constructor () {

        this.state = []

        this.setState()

    }
  
    setState() {

        var defaultVar = [
            {
                type: 'text',
                component: InputText,
                componentEdit: InputTextEdit,
            },
            {
                type: 'email',
                component: InputText,
                componentEdit: InputTextEdit,
            },
            {
                type: 'textarea',
                component: InputText,
                componentEdit: InputTextEdit,
            },
        ]

        var stateNew = []

        defaultVar.map((row, key) => {

            var item = {}
                item.id = nextId()
                item.input = row

            if ( row.content ){
                row.content.map((content, contentKey) =>
                    item.input.content[contentKey] = []
                )
            }
            

            stateNew.push(item)

        })

        console.log( stateNew )

        this.state = stateNew

    }
  
    getState () {

        return this.state

    }

  }
  
const fieldsStore = new FieldsStore({})

export default fieldsStore