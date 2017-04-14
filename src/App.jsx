import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import turf from '@turf/turf';
import L from 'leaflet';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.mapClickHandler = this.mapClickHandler.bind(this);
        this.hexClickHandler = this.hexClickHandler.bind(this);
    }

    mapClickHandler(e) {
        let map = this.refs.map.leafletElement;

        let mapBounds = map.getBounds();

        let bbox = [
            mapBounds._southWest.lng,
            mapBounds._southWest.lat,
            mapBounds._northEast.lng,
            mapBounds._northEast.lat,
        ];

        let cellSize = 6;
        let units = 'miles';
        let hexGrid = turf.hexGrid(bbox, cellSize, units);

        hexGrid.features.forEach(feature => {
            let points = feature.geometry.coordinates[0].map(point => [point[1], point[0],]);

            L.polygon(points).addTo(map);
        });
    }

    hexClickHandler(e) {
        console.log(`
            Click Coordinates:
            -------------------------------
            Latitude: ${e.latlng.lat}
            Longitude: ${e.latlng.lng}
        `);
    }

    render() {
        return (
            <Map
                ref={'map'}
                center={[48.82404503, -114.11705017,]}
                zoom={11}
                onClick={this.mapClickHandler}
            >
                <TileLayer
                    url={'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
                    attribution={'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}
                />
                { this.props.hexes }
            </Map>
        );
    }
}
export default App;
