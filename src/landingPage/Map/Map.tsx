/* ts-lint: disable */
import * as React from 'react';
import { apiCall } from '../../globalTypes/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';

interface IUseTwoProps {
	apiInformation: apiCall;
	position: any;
	layer: string;
}

const Wrapper = styled.div`
	width: 100%;
	height: 40vh;
`;

// const { Map: LeafletMap, TileLayer, Marker, Popup } = L

class Map extends React.Component<IUseTwoProps> {

	public map: any;

 	componentDidMount () {
		this.map = L.map('map', {
			center: this.props.position,
			zoom: 6,
			dragging: false
		});
		L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
			maxZoom: 19,
			maxNativeZoom: 16
		}).addTo(this.map);
		L.tileLayer(`https://tile.openweathermap.org/map/${this.props.layer}/{z}/{x}/{y}.png?appid=fe9dbf41e77f7f993487181ce566b213`, {
			maxZoom: 19,
			maxNativeZoom: 16
		}).addTo(this.map);
  	}


  	public render() {
		return (
			<Wrapper id='map'/>
		);
  	}
}

export default Map;