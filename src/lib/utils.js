export const toGeoJson = (items) => {
    const geo = {
        features: []
    }
    const feature = {
        geometry: {
            coordinates: [],
            type: 'Point'
        },
        properties: {},
        type: 'Feature'
    }

    geo.features = items.map((item) => {
        return {
            geometry: {
                coordinates: item.geometry.coordinates,
                type: 'Point'
            },
            properties: {
                name: item.content,
                start: item.start,
                end: item.end
            },
            type: 'Feature'
        }
    })
    let prev
    items.forEach((it, i) => {
        if (i === 0) {
            prev = it
        }
        if (it.group === 100) {
            const g = {
                type: 'Feature',
                properties: {
                    color: '#f7455d'
                },
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        prev.geometry.coordinates,
                        it.geometry.coordinates
                    ]
                }
            }
            prev = it
            geo.features.push(g)
        }
        
    })

    return geo
}

function averageGeolocation(coords) {
    const length = coords.length
    const lat = coords.map(c => c[0]).reduce((partial, a) => partial + a, 0)
    const lng = coords.map(c => c[1]).reduce((partial, a) => partial + a, 0)
    return [lat / length, lng / length]
  }

export const calculateCenter = (items) => {
    const ar = items.map((item) => {
        return item.geometry.coordinates
    })
    console.log('calculating', ar)
    return averageGeolocation(ar)
}