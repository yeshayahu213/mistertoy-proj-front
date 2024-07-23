import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import logoUrl from '../assets/img/toys-favicon.png'
import { toyService } from '../services/toy.service'

function Marker({ value }) {
    return (
        <div className="branch-img">
            {value && <img src={value} />}
        </div>
    )
}



const branches = [
    {
        city: 'Tel Aviv',
        id: 102,
        zoom: 12,
        coordinates: {
            lat: 32.071035,
            lng: 34.779118,
        },
    },
    {
        city: 'Haifa',
        id: 101,
        zoom: 12,
        coordinates: {
            lat: 32.820789,
            lng: 34.963488,
        },
    },
    {
        city: 'Jerusalem',
        id: 103,
        zoom: 12,
        coordinates: {
            lat: 31.773362,
            lng: 35.221193,
        },
    },
]

const API_KEY = ''

export function Map() {
    const [selectedBranch, setSelectedBranch] = useState()


    //* In production with Render
    // const [apiKey, setApiKey] = useState()
    // useEffect(() => {
    //     toyService.getApiKey()
    //         .then(setApiKey)
    // }, [])


    function onSelectBranch(branch) {
        const branchToSelect = branch.id === selectedBranch?.id ? null : branch
        setSelectedBranch(branchToSelect)
    }

    const { zoom = 8, coordinates = { lat: 32.071035, lng: 34.779118, } } = selectedBranch || {}
    return (
        <div className='branches-btns'>
            {branches.map(branch => {
                return (
                    <button
                        className={branch.id === selectedBranch?.id ? 'selected' : ''}
                        key={branch.city}
                        onClick={() => onSelectBranch(branch)}
                    >
                        {branch.city}
                    </button>
                )
            })}
            {/* // Important! Always set the container height explicitly */}
            <div className="map" style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={coordinates}
                    zoom={zoom}
                >
                    {branches.map(branch => {
                        return (
                            <Marker
                                {...branch.coordinates}
                                // lat={branch.coordinates.lat}
                                // lng={branch.coordinates.lng}
                                key={branch.city}
                                value={logoUrl}
                            />
                        )
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}
