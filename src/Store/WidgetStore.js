import React from 'react'
import nextId from 'react-id-generator'

import { Column, ColumnEdit } from '../Components/TemplateCreation/Widgets/Column/Column'
import { Image, ImageEdit } from '../Components/TemplateCreation/Widgets/Image/Image'
import { Text, TextEdit } from '../Components/TemplateCreation/Widgets/Text/Text'
import { Form, FormEdit } from '../Components/TemplateCreation/Widgets/Form/Form'
import { Button, ButtonEdit } from '../Components/TemplateCreation/Widgets/Button/Button'
import { Video, VideoEdit } from '../Components/TemplateCreation/Widgets/Video/Video'
import { MapWidget, MapEdit } from '../Components/TemplateCreation/Widgets/Map/Map'
import { ButtonLink, ButtonLinkEdit } from '../Components/TemplateCreation/Widgets/ButtonLink/ButtonLink'
import { Offer, OfferEdit } from '../Components/TemplateCreation/Widgets/Offer/Offer'
import { Timer, TimerEdit } from '../Components/TemplateCreation/Widgets/Timer/Timer'


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

                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAADcCAIAAAAk4inNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOGMwZmM0Ny0wMzgzLTQxYzktYmU1My04ZWI0MWU2ZGZkZjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzBDN0Y2N0EwMTk4MTFFQjgxNEZGMDNBMEUxNjlFNDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBDN0Y2NzkwMTk4MTFFQjgxNEZGMDNBMEUxNjlFNDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzNhMGFmOC0yZjlhLTQzYjgtODYyZi0yYjhjMmVmZTRlZTkiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjZjhiZDMxNC0xNzI1LWY1NDUtOWY0Ni04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',
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
                className: 'widget-offer',
                name: "Oferta",
                ico: 'offer',
                cat: 'conteudo',
                component: Offer,
                componentEdit: OfferEdit,
                options: {

                    title: 'PROMOÇÃO POR TEMPO LIMITADO',
                    valuePrev: 'R$ 600',
                    valueNext: 'R$ 480',
                    src: 'https://www.litoralverde.com.br/img/uploads/acomodacao_hotel/pousada-maravilha-area-piscina_1487640559.jpg',
                    
                    height: '180',
                    heightType: 'px',
                    colorTitle: '#4d545e',
                    colorText: '#FFF',
                    backgroundColor: '#2e304b'
                }
            },

            { 
                className: 'widget-offer',
                name: "Contador",
                ico: 'timer',
                cat: 'conteudo',
                component: Timer,
                componentEdit: TimerEdit,
                options: {

                    title: 'ESTA PROMOÇÃO TERMINA EM',
                    text: 'Não perca essa oportunidade',
                    date: '2021-12-31 23:59',
                    colorText: '#FFF',
                    backgroundColorPrimary: '#2e304b',
                    backgroundColorSecondary: 'orange',
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
            { 
                name: "Apple Store",
                ico: 'apple',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Apple Store',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-apple',
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
                name: "Play Store",
                ico: 'playstore',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Play Store',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-android',
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
                name: "MS Store",
                ico: 'microsoft',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'MS Store',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-microsoft',
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
                name: "Facebook",
                ico: 'facebook',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Facebook',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-facebook',
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
                name: "Instagram",
                ico: 'instagram',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Instagram',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-instagram',
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
                name: "Whatsapp",
                ico: 'whatsapp',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Whatsapp',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-whatsapp',
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
                name: "Telefone",
                ico: 'telefone',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Telefone',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-phone',
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
                name: "E-mail",
                ico: 'email',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'Telefone',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-envelope-o',
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
                name: "SMS",
                ico: 'sms',
                cat: 'funcao',
                component: ButtonLink,
                componentEdit: ButtonLinkEdit,
                options: {
                    name: 'SMS',
                    color: '#333',
                    backgroundColor: '#FFF',
                    href: 'https://tropa.digital/',
                    ico: 'fa fa-commenting-o',
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