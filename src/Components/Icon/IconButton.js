import React from 'react'
import { InlineIcon } from '@iconify/react'

import bookEditOutline from '@iconify-icons/mdi/book-edit-outline'
import bookPlusOutline from '@iconify-icons/mdi/book-plus-outline'

import minusBoxOutline from '@iconify-icons/mdi/minus-box-outline'
import contentSaveAllOutline from '@iconify-icons/mdi/content-save-all-outline'

import trashCanOutline from '@iconify-icons/mdi/trash-can-outline'
import eyeOutline from '@iconify-icons/mdi/eye-outline'

import whatsappIcon from '@iconify-icons/mdi/whatsapp'
import messageFlashOutline from '@iconify-icons/mdi/message-flash-outline'
import messageProcessingOutline from '@iconify-icons/mdi/message-processing-outline'

import closeIcon from '@iconify-icons/mdi/close'

const IconButton = ({icon}) => {

    let iconType

    if ( icon === 'edit' ){
        iconType = bookEditOutline
    } else if ( icon === 'new' ){
        iconType = bookPlusOutline
    } else if ( icon === 'del' ){
        iconType = trashCanOutline
    } else if ( icon === 'view' ){
        iconType = eyeOutline
    } else if ( icon === 'whatsapp' ){
        iconType = whatsappIcon
    } else if ( icon === 'flashsms' ){
        iconType = messageFlashOutline
    } else if ( icon === 'sms' ){
        iconType = messageProcessingOutline
    } else if ( icon === 'save' ){
        iconType = contentSaveAllOutline
    } else if ( icon === 'close' ){
        iconType = closeIcon
    } else if ( icon === 'min' ){
        iconType = minusBoxOutline
    }

    return (
        <div className="icon-button">
            <InlineIcon icon={iconType}/>
        </div>
    )

}

export default IconButton