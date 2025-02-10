// Token for access mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoiemV0b25nemh1IiwiYSI6ImNtNmllamU0ejAwMzcya3BvaHl4cHdyNTEifQ.8DeoWcpHZR2z0XiEGvRoJw';

const map = new mapboxgl.Map({
    container: 'map',
    // Mapbpx style
    style: 'mapbox://styles/zetongzhu/cm6v6xrar005201s37oh0dt58',
    // Starting coordinates, longitude and latitude, this coordinate corresponds to Toronto downtown
    center: [-79.381240, 43.657016],
    // Zoom level
    zoom: 13.17
});

// Rain effect, code adapted from Mapbox
map.on('style.load', () => {
    map.setRain({
        // Rain density
        density: [
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            0.0,
            13,
            0.5
        ],

        intensity: 1.0,
        color: '#a8adbc',
        opacity: 0.7,
        vignette: [
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            0.0,
            13,
            1.0
        ],
        'vignette-color': '#464646',
        direction: [0, 80],
        'droplet-size': [2.6, 18.2],
        'distortion-strength': 0.7,
        'center-thinning': 0

        map.on('load', () => {
            map.addSource('subway-lines', {
                type: 'geojson',
                data: 'toronto_subway.geojson' // Make sure this file is accessible in your project directory
            });

            map.addLayer({
                id: 'subway-lines-layer',
                type: 'line',
                source: 'subway-lines',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': ['get', 'ROUTE_COLOR'], // Uses color directly from GeoJSON
                    'line-width': 4
                }
            });
        })

    });
});
