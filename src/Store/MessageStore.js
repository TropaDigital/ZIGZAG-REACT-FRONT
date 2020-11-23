import React from 'react'
import { store } from 'react-notifications-component'

import swal from 'sweetalert'

class MessageStore {

    addError(msg)
    {

        swal({
            text: msg,
            icon: "error",
          })

    }

    addSuccess(msg)
    {

        swal({
            text: msg,
            icon: "success",
          })

    }

    addConfirm(msg, e)
    {

        swal({
            text: msg,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["Cancelar", "Confirmar"]
          })
          .then((willDelete) => {
            if (willDelete) {
              
                e()

            }
          });

    }

}
  
const messageStore = new MessageStore({})

export default messageStore