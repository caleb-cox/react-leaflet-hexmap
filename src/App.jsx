import * as React from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.mapClickHandler = this.mapClickHandler.bind(this);
        this.hexClickHandler = this.hexClickHandler.bind(this);
    }

    mapClickHandler(e) {
        console.log(`
            Click Coordinates:
            -------------------------------
            Latitude: ${e.latlng.lat}
            Longitude: ${e.latlng.lng}
        `);
    }

    hexClickHandler(e) {
        console.log(`
            The Blue Hexagon Was Clicked. Rejoice.
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
                <Polygon
                    positions={[
                        [48.86163878, -114.08415013,],
                        [48.82402628, -114.05129934,],
                        [48.78644166, -114.08419932,],
                        [48.78644166, -114.14990102,],
                        [48.82402628, -114.18280100,],
                        [48.86163878, -114.14995021,],
                    ]}
                    onclick={this.hexClickHandler}
                />
            </Map>
        );
    }
}
export default App;
