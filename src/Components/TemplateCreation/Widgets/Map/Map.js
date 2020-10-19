import React, { useState, useEffect } from 'react'
import FieldsetWidget from '../../Edition/FieldsetWidget'
import FormEditWidget from '../../Edition/FormEditWidget'
import GoogleMapReact from 'google-map-react'

import './Map.scss'
import Axios from 'axios'

const MapWidget = (props) => {

    const options = props.item.options

    const styleOptions = {
        minWidth: options.minWidth+options.minWidthType,
        maxWidth: options.maxWidth+options.maxWidthType,
        width: options.width+options.widthType,
        minHeight: options.minHeight+options.minHeightType,
        maxHeight: options.maxHeight+options.maxHeightType,
        height: options.height+options.heightType,
    }

    //

    const googleMap = {
        center: {
          lat: options.lat,
          lng: options.lng
        },
        zoom: 14
    }

    const AnyReactComponent = ({ text }) => <i class="fa fa-map-marker" aria-hidden="true"></i>

    return(

        <div className="map-widget" style={styleOptions}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDNnbvC6YiCzjPVTS2n1_S3OnLQXzXk49o' }}
                defaultCenter={googleMap.center}
                defaultZoom={googleMap.zoom}
            >
                <AnyReactComponent
                    lat={options.lat}
                    lng={options.lng}
                    text="My Marker"
                />
            </GoogleMapReact>

        </div>

    )

}

const MapEdit = ({id, item, onSave, onClose}) => {
    
    const [load, setLoad] = useState(false)

    const [options, setOptions] = useState({})

    const [loadAddress, setLoadAddress] = useState(false)

    useEffect(() => {

        console.log( item )
        setOptions({})
        setOptions(item.options)

    }, [item, options])

    function handleOnChange(e)
    {

        options[e.target.name] = e.target.value
        setOptions({})

    }

    function handleLatLng(address)
    {

        setLoad(true)

        Axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDNnbvC6YiCzjPVTS2n1_S3OnLQXzXk49o').then(res => {

            options.address = address
            options.lat = res.data.results[0].geometry.location.lat
            options.lng = res.data.results[0].geometry.location.lng            
            
            console.log(options)
            setOptions({})

            setLoad(false)

        })

    }

    const googleMap = {
        center: {
          lat: options.lat,
          lng: options.lng
        },
        zoom: 14
    }

    const AnyReactComponent = ({ text }) => <i class="fa fa-map-marker" aria-hidden="true"></i>

    return(

        <>
        { load === false && 
            <FormEditWidget onSave={onSave} item={item}>

                <div className="group" style={{height: '200px'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDNnbvC6YiCzjPVTS2n1_S3OnLQXzXk49o' }}
                        defaultCenter={googleMap.center}
                        defaultZoom={googleMap.zoom}
                    >
                        <AnyReactComponent
                            lat={options.lat}
                            lng={options.lng}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>

                <FieldsetWidget legend="Endereço" full={true}>
                    <input type="text" onBlur={(e) => handleLatLng(e.target.value)} name="address" defaultValue={options.address}/>
                </FieldsetWidget>

                <FieldsetWidget legend="Altura">
                    <input type="text" onChange={(e) => handleOnChange(e)} name="height" defaultValue={options.height} />
                    <select onChange={(e) => handleOnChange(e)} name="heightType" defaultValue={options.heightType}>
                        <option value="px">pixel</option>
                    </select>
                </FieldsetWidget>

            </FormEditWidget>

        }
        </>

    )

}

export { MapWidget, MapEdit } 