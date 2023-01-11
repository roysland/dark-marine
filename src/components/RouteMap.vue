<style lang="scss">
#map {
    min-height: 60vh;
}
</style>
<template>
    <div id="map" ref="map"></div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { calculateCenter, toGeoJson } from '../lib/utils'
export default {
    props: {
        items: {
            type: Array,
            default: function () { return [] }
        }
    },
    data() {
        return {
            geoItems: {
                type: "FeatureCollection",
                ...toGeoJson(this.items)
            },
            map: null
        }
    },
    methods: {

    },
    mounted() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoib2xlam9yIiwiYSI6ImNqcXh6N3U5MjAzZzI0Mm1qbXNtN2N2ZDAifQ.6bbUsWNXftwfUjmm8asUgA'
        const findCenter = calculateCenter(this.items)
        console.log(findCenter)
        const map = new mapboxgl.Map({
            container: this.$refs.map,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: findCenter,
            zoom: 7,
            bearing: 0,
            pitch: 50
        });

        map.addControl(new mapboxgl.NavigationControl());


        map.on('load', () => {
            map.addSource('locations', {
                'type': 'geojson',
                'data': this.geoItems
            });
            map.addLayer({
            'id': 'openseamap',
            'type': 'raster',
            'source': {
            'type': "raster",
            'tiles': ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
            'tileSize': 256
            },
            "minzoom": 0,
            "maxzoom": 22,
            "paint": {
            "raster-opacity": .8
            }
        }, 'waterway-label')
            map.addLayer({
                id: 'markers',
                type: 'circle',
                source: 'locations',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#f04090'
                },
                filter: ['==', '$type', 'Point']
            })
            map.addLayer({
            'id': 'lines',
            'type': 'line',
            'source': 'locations',
            'paint': {
            'line-width': 3,
            // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
            // to set the line-color to a feature property value.
            'line-color': ['get', 'color']
            }
            });
        });
    }
}
</script>