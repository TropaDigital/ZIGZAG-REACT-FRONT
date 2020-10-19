import React from 'react'
import nextId from 'react-id-generator'

import { Column, ColumnEdit } from '../Components/TemplateCreation/Widgets/Column/Column'
import { Image, ImageEdit } from '../Components/TemplateCreation/Widgets/Image/Image'
import { Text, TextEdit } from '../Components/TemplateCreation/Widgets/Text/Text'
import { Form, FormEdit } from '../Components/TemplateCreation/Widgets/Form/Form'
import { Button, ButtonEdit } from '../Components/TemplateCreation/Widgets/Button/Button'
import { Video, VideoEdit } from '../Components/TemplateCreation/Widgets/Video/Video'
import { MapWidget, MapEdit } from '../Components/TemplateCreation/Widgets/Map/Map'


class WidgetStore {

    constructor () {

        this.state = []

        this.setState()

    }
  
    setState() {

        var defaultVar = [
            {
                className: 'column column-1',
                name: "1 coluna",
                ico: 'column-1',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    minHeightType: 'px',
                    padding: '4px',
                    backgroundColor: 'rgba(0,0,0,.1)',
                },
                content: [
                    []
                ]
            },
            { 
                className: 'column column-2',
                name: "2 colunas",
                ico: 'column-2',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    minHeightType: 'px',
                    padding: '4px',
                    backgroundColor: 'rgba(0,0,0,.1)',
                },
                content: [
                    [],[]
                ]
            },
            { 
                className: 'column column-3',
                name: "3 colunas",
                ico: 'column-3',
                cat: 'secao',
                component: Column,
                componentEdit: ColumnEdit,
                options: {
                    width: 'auto',
                    widthType: '%',
                    minHeight: '85',
                    minHeightType: 'px',
                    padding: '4px',
                    backgroundColor: 'rgba(0,0,0,.1)',
                },
                content: [
                    [],[],[]
                ]
            },
        
            { 
                className: 'widget-image',
                name: "Imagem",
                ico: 'image',
                cat: 'conteudo',
                component: Image,
                componentEdit: ImageEdit,
                options: {

                    maxWidth: '100',
                    maxWidthType: '%',

                    minWidth: 'auto',
                    minWidthType: 'px',

                    width: 'auto',
                    widthType: 'px',

                    maxHeight: 'auto',
                    maxHeightType: 'px',

                    minHeight: 'auto',
                    minHeightType: 'px',
                    
                    height: 'auto',
                    heightType: 'px',
                }
            },
            { 
                className: 'widget-text',
                name: "Texto",
                ico: 'text',
                cat: 'conteudo',
                component: Text,
                componentEdit: TextEdit,
                options: {
                    backgroundColor: '#FFF',
                    color: '#333',
                    fontFamily: 'Titillium Web',
                    textAlign: 'center',
                    fontSize: '15px',
                    lineHeight: '19px',
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    paddingBottom: '0px',
                    paddingRight: '0px',

                    text: '<p style="font-weight:bold;">Lorem ipsum, dolor sit amet, consectetuer adipiscing elit, send diam nonummy nibh euismod</p>',
                }
            },
            { 
                className: 'widget-button',
                name: "Botão",
                ico: 'button',
                cat: 'conteudo',
                component: Button,
                componentEdit: ButtonEdit,
                options: {
                    text: 'Clique aqui',
                    link: 'https://tropa.digital',
                    
                    borderSize: '2px',
                    borderType: 'solid',
                    borderColer: 'red',

                    fontFamily: 'Titillium Web',
                    textAlign: 'center',
                    fontSize: '15px',
                    lineHeight: '19px',

                    paddingTop: '8px',
                    paddingLeft: '12px',
                    paddingBottom: '8px',
                    paddingRight: '12px',

                    borderRadiusTop: '0px',
                    borderRadiusLeft: '0px',
                    borderRadiusBottom: '0px',
                    borderRadiusRight: '0px',

                    backgroundColor: 'purple',
                    color: 'orange'
                }
            },
            { 
                className: 'widget-form',
                name: "Formulário",
                ico: 'form',
                cat: 'conteudo',
                component: Form,
                componentEdit: FormEdit,
                options: {
                    title: {
                        value: 'Titulo do formulário',
                        style: {
                            color: '#333',
                            fontFamily: 'Titillium Web',
                            textAlign: 'left',
                            fontSize: '18px',
                            lineHeight: '19px',
                            paddingTop: '0px',
                            paddingLeft: '0px',
                            paddingBottom: '0px',
                            paddingRight: '0px',
                        }
                    },
                    button: {
                        value: 'Enviar',
                        style: {
                            backgroundColor: '#0062f9',
                            color: '#FFF',
                            fontFamily: 'Titillium Web',
                            textAlign: 'center',
                            fontSize: '15px',
                            lineHeight: '19px',
                            paddingTop: '8px',
                            paddingLeft: '20px',
                            paddingBottom: '8px',
                            paddingRight: '20px',
                        }
                    },
                    fields: [
                        {
                            id: 0,
                            input: {
                                type: 'text',
                                minLength: 10,
                                maxLength: 50,
                                required: false,
                                placeholder: 'Nome',
                                name: 'nome',
                                mask: '',
                                style: {
                                    color: '#333',
                                },
                            }
                        },
                        {
                            id: 1,
                            input: {
                                type: 'email',
                                minLength: 10,
                                maxLength: 50,
                                required: false,
                                placeholder: 'E-mail',
                                name: 'email',
                                mask: '',
                                style: {
                                    color: '#333',
                                },
                            }
                        },
                        {
                            id: 2,
                            input: {
                                type: 'textarea',
                                minLength: 10,
                                maxLength: 50,
                                required: false,
                                placeholder: 'Mensagem',
                                name: 'mensagem',
                                mask: '',
                                style: {
                                    color: '#333',
                                },
                            }
                        },
                    ]
                }
            },
            { 
                name: "Vídeo",
                ico: 'video',
                cat: 'conteudo',
                component: Video,
                componentEdit: VideoEdit,
                options: {
                    src: 'https://www.youtube.com/embed/swJOIjjW69U',

                    maxWidth: '100',
                    maxWidthType: '%',

                    minWidth: 'auto',
                    minWidthType: 'px',

                    width: 'auto',
                    widthType: 'px',

                    maxHeight: 'auto',
                    maxHeightType: 'px',

                    minHeight: 'auto',
                    minHeightType: 'px',
                    
                    height: 'auto',
                    heightType: 'px',
                }
            },
            { 
                name: "Mapa",
                ico: 'map',
                cat: 'conteudo',
                component: MapWidget,
                componentEdit: MapEdit,
                options: {
                    address: 'Avenida Paulista',

                    lat: -23.5613462,
                    lng: -46.6564872,

                    maxWidth: '100',
                    maxWidthType: '%',

                    minWidth: 'auto',
                    minWidthType: 'px',

                    width: 'auto',
                    widthType: 'px',

                    maxHeight: 'auto',
                    maxHeightType: 'px',

                    minHeight: 'auto',
                    minHeightType: 'px',
                    
                    height: '200',
                    heightType: 'px',
                }
            },
        ] 

        var stateNew = []

        defaultVar.map((row, key) => {

            var item = {}
                item.id = nextId()
                item.template = row

            if ( row.content ){
                row.content.map((content, contentKey) =>
                    item.template.content[contentKey] = []
                )
            }

            stateNew.push(item)

        })

        this.state = stateNew

    }
  
    getState () {

        return this.state

    }

  }
  
const widgetStore = new WidgetStore({})

export default widgetStore